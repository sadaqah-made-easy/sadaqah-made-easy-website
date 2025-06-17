---
title: "Public Data Documentation"
meta_title: "Public Data Documentation"
description: "Documentation for Sadaqah Made Easy public JSON data files"
draft: false
---

## Introduction

This page documents the public JSON data files available for the Sadaqah Made Easy website and mobile application.
All data is provided in static JSON files and is accessible via standard HTTP requests.

## Available JSON Data Files

### 1. Projects

```http
GET /data/projects.json
```

A JSON file containing an array of all published projects with their details.

### 2. Organizers

```http
GET /data/organizers.json
```

A JSON file containing an array of all organizers with their details.

### 3. Taxonomies

```http
GET /data/taxonomies.json
```

A JSON file containing categories and tags used in projects with their counts.

### 4. Config

```http
GET /data/config.json
```

A JSON file containing website configuration data (menu, theme settings, social links, etc.).

### 5. Search

```http
GET /data/search.json
```

A JSON file containing a combined list of projects and organizers for search functionality.

### 6. Manifest

```http
GET /data/manifest.json
```

A JSON file containing version information, generation timestamp, and available data files.

## Data Format

All files are in JSON format. Example data from projects.json:

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

## Implementation

These JSON data files are statically generated during the website build process and served directly from the public folder.
This approach ensures fast access and reduces server load.

## Usage

These JSON files can be used by:
- The Sadaqah Made Easy website for client-side data rendering
- The Sadaqah Made Easy mobile application for accessing project and organizer information
- Third-party applications that wish to display Sadaqah Made Easy content

## Cross-Origin Resource Sharing (CORS)

Since these are static files served from the public folder, they are accessible from any origin.

## Updates

The JSON data files are updated whenever the website is rebuilt. Check the `generatedAt` field  
in the manifest.json file to see when the data was last updated.
