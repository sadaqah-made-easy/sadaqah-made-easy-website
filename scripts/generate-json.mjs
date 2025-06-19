#!/usr/bin/env node

/**
 * Script to generate optimized JSON files for the Sadaqah Made Easy website
 *
 * This script:
 * 1. Creates lightweight index files for quick access
 * 2. Splits large data into paginated chunks for better performance
 * 3. Maintains full data files for direct access when needed
 * 4. Creates manifests for tracking and versioning
 */

import { exec } from "child_process";

console.log("Starting optimized JSON generation...");

// Run the generator script
exec("node scripts/jsonGenerator.mjs", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }

  console.log(stdout);
  console.log("✅ JSON generation completed successfully!");
  console.log("Data now available in the following formats:");
  console.log("  - Lightweight indexes: public/data/*-index.json");
  console.log("  - Paginated chunks: public/data/chunks/");
  console.log("  - Full data: public/data/*.json");
});
