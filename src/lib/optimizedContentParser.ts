import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";

const contentPath = "src/content";
const dataPath = "public/data";

// Helper function to read file content
const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8");
};

// Helper function to parse frontmatter
const parseFrontmatter = (frontmatter: any) => {
  const frontmatterString = JSON.stringify(frontmatter);
  return JSON.parse(frontmatterString);
};

// get list page data, ex: _index.md
export const getListPage = (filePath: string) => {
  const pageDataPath = path.join(contentPath, filePath);

  if (!fs.existsSync(pageDataPath)) {
    notFound();
  }

  const pageData = readFile(pageDataPath);
  const { content, data: frontmatter } = matter(pageData);

  return {
    frontmatter: parseFrontmatter(frontmatter),
    content,
  };
};

// get all single pages, ex: blog/post.md
export const getSinglePage = (folder: string) => {
  const folderPath = path.join(contentPath, folder);

  if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
    notFound();
  }

  const filesPath = fs.readdirSync(folderPath);
  const sanitizeFiles = filesPath.filter((file) => file.endsWith(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/),
  );

  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(folderPath, filename);
    const pageData = readFile(filePath);
    const { content, data: frontmatter } = matter(pageData);
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;

    return {
      frontmatter: parseFrontmatter(frontmatter),
      slug: url,
      content,
    };
  });

  const publishedPages = singlePages.filter(
    (page) => !page.frontmatter.draft && page,
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date(),
  );

  return filterByDate;
};

// get paginated JSON data
export const getPagedData = (contentType: string, page: number = 1) => {
  try {
    const manifestPath = path.join(
      dataPath,
      "chunks",
      contentType,
      "manifest.json",
    );

    if (!fs.existsSync(manifestPath)) {
      return { data: [], totalItems: 0, totalPages: 0 };
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

    if (page > manifest.chunks) {
      return { data: [], totalItems: 0, totalPages: manifest.chunks };
    }

    const chunkPath = path.join(
      dataPath,
      "chunks",
      contentType,
      `${page}.json`,
    );
    const chunkData = JSON.parse(fs.readFileSync(chunkPath, "utf-8"));

    return {
      data: chunkData,
      totalItems: manifest.total,
      totalPages: manifest.chunks,
    };
  } catch (error) {
    console.error(`Error loading paged data for ${contentType}:`, error);
    return { data: [], totalItems: 0, totalPages: 0 };
  }
};

// get index data only (lightweight data without content)
export const getIndexData = (contentType: string) => {
  try {
    const indexPath = path.join(dataPath, `${contentType}-index.json`);

    if (!fs.existsSync(indexPath)) {
      return [];
    }

    return JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  } catch (error) {
    console.error(`Error loading index data for ${contentType}:`, error);
    return [];
  }
};

// get single content by slug from JSON data
export const getContentBySlug = (contentType: string, slug: string) => {
  try {
    const dataFilePath = path.join(dataPath, `${contentType}.json`);

    if (!fs.existsSync(dataFilePath)) {
      return null;
    }

    const allData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
    const content = allData.find((item: any) => item.slug === slug);

    return content || null;
  } catch (error) {
    console.error(`Error loading content for ${contentType}/${slug}:`, error);
    return null;
  }
};
