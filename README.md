<h1 align=center>Sadaqah Made Easy Website</h1>

<p align=center>A modern donation platform built with Next.js, TailwindCSS & TypeScript, making charity and sadaqah accessible to everyone.</p>

<p align=center>Empowering Muslims to make a difference through simple, transparent donations.</p>
<p align=center>If you find this project useful, please give it a ⭐ to show your support.</p>

<h2 align="center"><a target="_blank" href="https://sadaqah-made-easy.vercel.app" rel="nofollow">👀 Live Website</a> | <a target="_blank" href="https://pagespeed.web.dev/analysis/https-sadaqah-made-easy-vercel-app/zttnq0z42d?form_factor=desktop">Page Speed (95%+)🚀</a>
</h2>

<p align=center>
  <a href="https://github.com/vercel/next.js/releases/tag/v15.3.4" alt="Next.js Version">
    <img src="https://img.shields.io/static/v1?label=NEXTJS&message=15.3&color=000&logo=nextjs" alt="Next.js Version" />
  </a>

  <a href="https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.1.10" alt="Tailwind Version">
    <img src="https://img.shields.io/static/v1?label=TAILWIND&message=4.1.10&color=38BDF8&logo=tailwindcss" alt="Tailwind Version" />
  </a>

  <a href="https://github.com/sadaqah-Made-Easy/sadaqah-made-easy-website/blob/main/LICENSE">
  <img src="https://img.shields.io/github/license/zeon-studio/nextplate" alt="license">
  </a>

  <img src="https://img.shields.io/github/languages/code-size/sadaqah-Made-Easy/sadaqah-made-easy-website" alt="code size">

  <a href="https://github.com/sadaqah-made-easy/sadaqah-made-easy-website/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/sadaqah-Made-Easy/sadaqah-made-easy-website" alt="contributors"></a>

</p>

## Features

- 🚀 **High Performance**: Optimized with 95%+ PageSpeed score
- 📱 **Responsive**: Mobile-first design approach
- 🔍 **SEO Optimized**: Meta tags, sitemap, and SEO best practices
- 📊 **Analytics Ready**: Easy integration with analytics platforms
- 🌙 **Donation Projects**: Browse and support various charity projects
- 👥 **Organizer Profiles**: Learn about the organizations behind each project
- 🔄 **Content Management**: Connected with Sitepins CMS for easy updates
- 🔁 **Automatic Deployment**: CI/CD pipeline with GitHub and Vercel
- 📊 **API for Mobile Apps**: Structured JSON data for mobile app integration

## Tech Stack

- **Frontend**: Next.js v15, TypeScript v5, TailwindCSS v4
- **Animations**: CSS Transitions (GSAP optimized for performance)
- **Deployment**: Vercel
- **CMS**: Sitepins CMS
- **Performance Optimization**:
  - Lazy-loaded components and images
  - Server-side rendering
  - Static site generation where appropriate
  - Optimized asset loading

# Steps to Set Up the Project

## 1. Create a Gmail Account with 2FA

- Log in to your Gmail account.
- Go to **Manage Your Google Account > Security**.
  ![Screenshot_1](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/sadaqahme/1.png)
- Locate the **2-Step Verification** option and click on it.
  ![Screenshot_2](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/sadaqahme/2.png)
- Select the arrow next to **App Passwords**.
  ![Screenshot_3](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/sadaqahme/3.png)
- Generate a new app password, and you will receive a 16-character password. Copy this password.

---

## 2. Create a GitHub Account

- Sign up for GitHub and log in.
- Fork the **Sadaqahme** project to your account.
  ![Screenshot_4](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/sadaqahme/4.png)

---

## 3. Deploy the Project on Vercel

- Sign up for Vercel, connect your GitHub account, and create a new project.
  ![Screenshot_6](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/sadaqahme/6.png)
- Import your forked project into Vercel.
  ![Screenshot_7](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/sadaqahme/7.png)
- Add the environment variables for the project.
  ![Screenshot_8](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/sadaqahme/8.png)
- Deploy the project.
  ![Screenshot_9](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/sadaqahme/9.png)

---

## 4. Connect the Project to Sitepins CMS

- Sign up or log in to Sitepins CMS.
  ![Screenshot_10](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/sadaqahme/10.png)
- Connect your GitHub project to Sitepins CMS.
  ![Screenshot_11](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/sadaqahme/11.png)
- Link your deployed project for content updates.
  ![Screenshot_12](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/sadaqahme/12.png)

You're done! 🎉

---

## JSON Data Files for Mobile App

This project provides optimized, structured JSON data files for a mobile app to consume the website's content:

### Available Data Files

#### Full Data Files

- **Projects**: `/data/projects.json` - All published projects
- **Organizers**: `/data/organizers.json` - All organizers

#### Lightweight Indexes

- **Projects Index**: `/data/projects-index.json` - Lightweight list of projects
- **Organizers Index**: `/data/organizers-index.json` - Lightweight list of organizers

#### Chunked Data (for Pagination)

- **Project Chunks**: `/data/chunks/projects/{page}.json` - Paginated project data
- **Organizer Chunks**: `/data/chunks/organizers/{page}.json` - Paginated organizer data

#### Supporting Data

- **Taxonomies**: `/data/taxonomies.json` - Categories and tags
- **Config**: `/data/config.json` - Website configuration
- **Search**: `/data/search.json` - Combined lightweight index for search
- **Manifest**: `/data/manifest.json` - Version information and available data endpoints

### Usage

1. **Generate the JSON data files**:

   ```bash
   yarn generate-json
   ```

2. **Documentation**:  
   Visit `/public-data-docs` on your deployed website for detailed documentation.

### Performance Benefits

The optimized data structure provides:

- Reduced server load with smaller payloads
- Faster initial page loads with lightweight indexes
- Efficient pagination with pre-chunked data
- Better caching with granular data files

### Mobile App Development

These JSON data files provide all the necessary information for building a performant mobile app that mirrors the website's functionality. The data structure is designed for efficient consumption in mobile app frameworks like React Native or Flutter.

For implementation details, see the public data documentation at `/public-data-docs` on your deployed site.
