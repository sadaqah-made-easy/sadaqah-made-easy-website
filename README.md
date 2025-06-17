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

## Public JSON Data Files for Mobile App

This project provides structured JSON data files for a mobile app to consume the website's content:

### Available Data Files

1. **Projects**: `/data/projects.json` - All published projects
2. **Organizers**: `/data/organizers.json` - All organizers
3. **Taxonomies**: `/data/taxonomies.json` - Categories and tags
4. **Config**: `/data/config.json` - Website configuration
5. **Search**: `/data/search.json` - Combined projects and organizers data for search
6. **Manifest**: `/data/manifest.json` - Version information and available data files

### Usage

1. **Generate the JSON data files**:

   ```bash
   yarn generate-json
   ```

2. **Documentation**:  
   Visit `/public-data-docs` on your deployed website for detailed documentation.

### Mobile App Development

These JSON data files provide all the necessary information for building a mobile app that mirrors the website's functionality. The data is structured in a way that makes it easy to consume in mobile app frameworks like React Native or Flutter.
