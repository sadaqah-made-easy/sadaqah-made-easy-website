---
title: "Public Data Documentation"
meta_title: "Public Data Documentation"
description: "Documentation for Sadaqah Made Easy public JSON data files"
draft: false
---

## Introduction

This page documents the optimized public JSON data files available for the Sadaqah Made Easy website and mobile application.
All data is provided in static JSON files and is accessible via standard HTTP requests.
The data is organized into several types to optimize loading times and reduce server load.

## Available JSON Data Files

### Full Data Files

These files contain complete data for all content:

#### 1. Projects

```http
GET /data/projects.json
```

A JSON file containing an array of all published projects with their complete details and content.

#### 2. Organizers

```http
GET /data/organizers.json
```

A JSON file containing an array of all organizers with their complete details and content.

### Lightweight Index Files

These files contain minimal data for listing and overview pages, optimized for faster loading:

#### 3. Projects Index

```http
GET /data/projects-index.json
```

A lightweight JSON file containing essential information for all projects (title, image, slug, etc.) without the full content.

#### 4. Organizers Index

```http
GET /data/organizers-index.json
```

A lightweight JSON file containing essential information for all organizers without the full content.

### Chunked Data Files (for Pagination)

These files contain data split into pages for efficient loading of paginated content:

#### 5. Project Chunks

```http
GET /data/chunks/projects/{pageNumber}.json
```

Project data split into manageable chunks for pagination (replace `{pageNumber}` with the page number).

#### 6. Project Chunks Manifest

```http
GET /data/chunks/projects/manifest.json
```

Information about the project chunks, including total count, pages, and version.

#### 7. Organizer Chunks

```http
GET /data/chunks/organizers/{pageNumber}.json
```

Organizer data split into manageable chunks for pagination (replace `{pageNumber}` with the page number).

#### 8. Organizer Chunks Manifest

```http
GET /data/chunks/organizers/manifest.json
```

Information about the organizer chunks, including total count, pages, and version.

### Supporting Data Files

#### 9. Taxonomies

```http
GET /data/taxonomies.json
```

A JSON file containing categories and tags used in projects with their counts.

#### 10. Config

```http
GET /data/config.json
```

A JSON file containing website configuration data (menu, theme settings, social links, etc.).

#### 11. Search

```http
GET /data/search.json
```

A lightweight JSON file containing a combined list of projects and organizers for search functionality.

#### 12. Main Manifest

```http
GET /data/manifest.json
```

A JSON file containing version information, generation timestamp, and available data endpoints.

## Data Format Examples

### Full Data Format (projects.json)

```json
[
  {
    "group": "projects",
    "slug": "projects/avijatrik-zakat-fund",
    "frontmatter": {
      "title": "অভিযাত্রিক যাকাত ফান্ড",
      "meta_title": "অভিযাত্রিক যাকাত ফান্ড",
      "description": "অভিযাত্রিক Ovijatrik যাকাত ফান্ডের জন্য নির্ধারিত একাউন্টে আপনাদের যাকাতের টাকা দান করতে পারেন।",
      "date": "2025-02-27",
      "image": "/images/avijatrik-zakat-fund.png",
      "organizer": "ovijatrik",
      "categories": ["Zakat", "যাকাত", "রমাদান", "Ramadan"],
      "tags": ["Zakat", "Ramadan", "যাকাত"],
      "draft": false
    },
    "content": "আলহামদুলিল্লাহ, FHP-131 প্রজেক্টের মাধ্যমে এই সপ্তাহে আমাদের সংগ্রহ দাড়িয়েছে ৭ লক্ষ ৮৩ হাজার টাকা।..."
  }
]
```

### Lightweight Index Format (projects-index.json)

```json
[
  {
    "slug": "projects/avijatrik-zakat-fund",
    "title": "অভিযাত্রিক যাকাত ফান্ড",
    "image": "/images/avijatrik-zakat-fund.png",
    "categories": ["Zakat", "যাকাত", "রমাদান", "Ramadan"],
    "tags": ["Zakat", "Ramadan", "যাকাত"],
    "date": "2025-02-27"
  }
]
```

### Chunked Data Format (chunks/projects/1.json)

Similar to full data, but limited to a specific number of items per chunk (defaults to the pagination size in config).

### Manifest Format (manifest.json)

```json
{
  "version": "1.1",
  "generatedAt": "2025-06-18T08:30:00.000Z",
  "endpoints": {
    "indexes": [
      "/data/projects-index.json",
      "/data/organizers-index.json",
      "/data/search.json",
      "/data/taxonomies.json"
    ],
    "fullData": ["/data/projects.json", "/data/organizers.json"],
    "config": "/data/config.json",
    "chunks": {
      "projects": {
        "base": "/data/chunks/projects/",
        "manifest": "/data/chunks/projects/manifest.json",
        "total": 3
      },
      "organizers": {
        "base": "/data/chunks/organizers/",
        "manifest": "/data/chunks/organizers/manifest.json",
        "total": 2
      }
    }
  }
}
```

## Optimized Implementation

These JSON data files are statically generated during the website build process and served directly from the public folder. The optimization strategy includes:

1. **Lightweight Indexes**: Contain only essential fields needed for listings
2. **Chunked Data**: Content split into smaller pieces for pagination
3. **Full Data Access**: Complete data still available when needed
4. **Versioning**: Track changes and enable proper caching

This approach ensures fast access, reduces server load, and improves mobile app performance.

## Usage

These optimized JSON files can be used by:

- The Sadaqah Made Easy website for client-side data rendering
- The Sadaqah Made Easy mobile application for accessing content efficiently
- Third-party applications that wish to display Sadaqah Made Easy content

### Recommended Access Pattern

1. First load the lightweight index for quick listings
2. Load chunked data for paginated views
3. Load full content only when viewing a specific item

## Cross-Origin Resource Sharing (CORS)

Since these are static files served from the public folder, they are accessible from any origin.

## Updates

The JSON data files are updated whenever the website is rebuilt. Check the `generatedAt` field in the manifest.json file to see when the data was last updated. The version number in the manifest will increment when the data structure changes.
