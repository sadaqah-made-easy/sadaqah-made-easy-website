import fs from "fs";
import matter from "gray-matter";
import path from "path";

const CONTENT_DEPTH = 2;
const JSON_FOLDER = "./public/data";
const CHUNKS_FOLDER = "./public/data/chunks";
const PROJECTS_FOLDER = "src/content/projects";
const ORGANIZERS_FOLDER = "src/content/organizer";
const CONFIG_FOLDER = "src/config";

const config = JSON.parse(
  fs.readFileSync(path.join(CONFIG_FOLDER, "config.json"), "utf8"),
);
const PAGINATION_SIZE = config.settings.pagination || 10;
const VERSION = "1.1"; // Increment this when data structure changes

// get data from markdown
const getData = (folder, groupDepth) => {
  const getPath = fs.readdirSync(folder);
  const removeIndex = getPath.filter((item) => !item.startsWith("_"));

  const getPaths = removeIndex.flatMap((filename) => {
    const filepath = path.join(folder, filename);
    const stats = fs.statSync(filepath);
    const isFolder = stats.isDirectory();

    if (isFolder) {
      return getData(filepath, groupDepth);
    } else if (filename.endsWith(".md") || filename.endsWith(".mdx")) {
      const file = fs.readFileSync(filepath, "utf-8");
      const { data, content } = matter(file);
      const pathParts = filepath.split(path.sep);
      const slug =
        data.slug ||
        pathParts
          .slice(CONTENT_DEPTH)
          .join("/")
          .replace(/\.[^/.]+$/, "");
      const group = pathParts[groupDepth];

      return {
        group: group,
        slug: slug,
        frontmatter: data,
        content: content,
      };
    } else {
      return [];
    }
  });

  const publishedPages = getPaths.filter(
    (page) => !page.frontmatter?.draft && page,
  );
  return publishedPages;
};

// Extract unique taxonomy items
const getAllTaxonomy = (folder, taxonomy) => {
  const singlePages = getData(path.join("src/content", folder), 2);
  const taxonomyItems = singlePages.flatMap((page) => {
    const taxonomyData = page.frontmatter[taxonomy];
    return taxonomyData || [];
  });

  // Count taxonomy items
  const taxonomyCounts = taxonomyItems.reduce((acc, item) => {
    if (item) {
      const lowercaseItem = item.toLowerCase();
      acc[lowercaseItem] = (acc[lowercaseItem] || 0) + 1;
    }
    return acc;
  }, {});

  const uniqueTaxonomies = Object.keys(taxonomyCounts).map((item) => ({
    name: item,
    count: taxonomyCounts[item],
  }));

  return uniqueTaxonomies;
};

// Split data into chunks based on pagination size
const splitIntoChunks = (data, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
};

// Write chunks to files
const writeChunks = (data, folderName, dataType) => {
  const chunks = splitIntoChunks(data, PAGINATION_SIZE);

  // Create chunks directory if it doesn't exist
  const chunksDir = path.join(CHUNKS_FOLDER, folderName);
  if (!fs.existsSync(chunksDir)) {
    fs.mkdirSync(chunksDir, { recursive: true });
  }

  // Write each chunk to a file
  chunks.forEach((chunk, index) => {
    fs.writeFileSync(
      path.join(chunksDir, `${index + 1}.json`),
      JSON.stringify(chunk),
    );
  });

  // Create a manifest file with metadata
  const manifest = {
    version: VERSION,
    total: data.length,
    chunkSize: PAGINATION_SIZE,
    chunks: chunks.length,
    generatedAt: new Date().toISOString(),
    type: dataType,
  };

  fs.writeFileSync(
    path.join(chunksDir, "manifest.json"),
    JSON.stringify(manifest),
  );

  return manifest;
};

// Create a lightweight index version with minimal data
const createLightIndex = (data, fields) => {
  return data.map((item) => {
    const lightItem = { slug: item.slug };
    fields.forEach((field) => {
      if (item.frontmatter && item.frontmatter[field] !== undefined) {
        lightItem[field] = item.frontmatter[field];
      }
    });
    return lightItem;
  });
};

// Create a search index with group, full frontmatter, and content
const createSearchIndex = (data) => {
  return data.map((item) => {
    return {
      group: item.group,
      slug: item.slug,
      frontmatter: item.frontmatter,
      content: item.content,
    };
  });
};

try {
  // Create folders if they don't exist
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER, { recursive: true });
  }

  if (!fs.existsSync(CHUNKS_FOLDER)) {
    fs.mkdirSync(CHUNKS_FOLDER, { recursive: true });
  }

  // Get data
  const projectsData = getData(PROJECTS_FOLDER, 2);
  const organizersData = getData(ORGANIZERS_FOLDER, 2);

  // Create lightweight indexes with essential fields
  const projectsLightIndex = createLightIndex(projectsData, [
    "title",
    "categories",
    "tags",
    "date",
    "image",
    "draft",
  ]);
  const organizersLightIndex = createLightIndex(organizersData, [
    "title",
    "image",
    "draft",
  ]);

  // Write lightweight indexes
  fs.writeFileSync(
    `${JSON_FOLDER}/projects-index.json`,
    JSON.stringify(projectsLightIndex),
  );

  fs.writeFileSync(
    `${JSON_FOLDER}/organizers-index.json`,
    JSON.stringify(organizersLightIndex),
  );

  // Write full data
  fs.writeFileSync(
    `${JSON_FOLDER}/projects.json`,
    JSON.stringify(projectsData),
  );

  fs.writeFileSync(
    `${JSON_FOLDER}/organizers.json`,
    JSON.stringify(organizersData),
  );

  // Split into chunks and create manifests
  const projectsManifest = writeChunks(projectsData, "projects", "projects");
  const organizersManifest = writeChunks(
    organizersData,
    "organizers",
    "organizers",
  );

  // Create taxonomies index
  const taxonomyData = {
    categories: getAllTaxonomy("projects", "categories"),
    tags: getAllTaxonomy("projects", "tags"),
  };

  fs.writeFileSync(
    `${JSON_FOLDER}/taxonomies.json`,
    JSON.stringify(taxonomyData),
  );

  // Copy config files
  const configFiles = {};
  ["config.json", "menu.json", "social.json", "theme.json"].forEach((file) => {
    try {
      configFiles[file.replace(".json", "")] = JSON.parse(
        fs.readFileSync(path.join(CONFIG_FOLDER, file), "utf8"),
      );
    } catch (err) {
      console.error(`Error reading ${file}:`, err);
    }
  });

  fs.writeFileSync(`${JSON_FOLDER}/config.json`, JSON.stringify(configFiles));

  // Create search.json by combining projects and organizers with full frontmatter
  const projectsSearch = createSearchIndex(projectsData);
  const organizersSearch = createSearchIndex(organizersData);
  const search = [...projectsSearch, ...organizersSearch];
  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify(search));

  // Create a manifest.json with version info and available endpoints
  const manifest = {
    version: VERSION,
    generatedAt: new Date().toISOString(),
    endpoints: {
      indexes: [
        "/data/projects-index.json",
        "/data/organizers-index.json",
        "/data/search.json",
        "/data/taxonomies.json",
      ],
      fullData: ["/data/projects.json", "/data/organizers.json"],
      config: "/data/config.json",
      chunks: {
        projects: {
          base: "/data/chunks/projects/",
          manifest: "/data/chunks/projects/manifest.json",
          total: projectsManifest.chunks,
        },
        organizers: {
          base: "/data/chunks/organizers/",
          manifest: "/data/chunks/organizers/manifest.json",
          total: organizersManifest.chunks,
        },
      },
    },
  };

  fs.writeFileSync(`${JSON_FOLDER}/manifest.json`, JSON.stringify(manifest));

  console.log("JSON files generated successfully!");
} catch (err) {
  console.error("Error generating JSON files:", err);
}
