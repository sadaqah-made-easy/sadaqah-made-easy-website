import fs from "fs";
import matter from "gray-matter";
import path from "path";

const CONTENT_DEPTH = 2;
const JSON_FOLDER = "./public/data";
const PROJECTS_FOLDER = "src/content/projects";
const ORGANIZERS_FOLDER = "src/content/organizer";
const CONFIG_FOLDER = "src/config";

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

try {
  // create folder if it doesn't exist
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER, { recursive: true });
  }

  // create json files for projects
  const projectsData = getData(PROJECTS_FOLDER, 2);
  fs.writeFileSync(
    `${JSON_FOLDER}/projects.json`,
    JSON.stringify(projectsData),
  );

  // create json files for organizers
  const organizersData = getData(ORGANIZERS_FOLDER, 2);
  fs.writeFileSync(
    `${JSON_FOLDER}/organizers.json`,
    JSON.stringify(organizersData),
  );

  // create json files for taxonomies
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

  // Create search.json by combining projects and organizers data
  const search = [...projectsData, ...organizersData];
  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify(search));

  // Create a manifest.json with version info and available endpoints
  const manifest = {
    version: "1.0",
    generatedAt: new Date().toISOString(),
    endpoints: [
      "/data/projects.json",
      "/data/organizers.json",
      "/data/taxonomies.json",
      "/data/config.json",
      "/data/search.json",
    ],
  };
  fs.writeFileSync(`${JSON_FOLDER}/manifest.json`, JSON.stringify(manifest));

  console.log("JSON files generated successfully!");
} catch (err) {
  console.error("Error generating mobile API files:", err);
}
