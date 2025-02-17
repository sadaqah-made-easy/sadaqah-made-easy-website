# Steps to Set Up the Project

## 1. Create a Gmail Account with 2FA
- Log in to your Gmail account.  
- Go to **Manage Your Google Account > Security**.  
- Locate the **2-Step Verification** option and click on it.  
- Select the arrow next to App Passwords.  
- Generate a new app password, and you will receive a 16-character password. Copy this password.  

---

## 2. Create a GitHub Account
- Sign up for GitHub and log in.  
- Fork the **Sadaqahme** project to your account.  
- In the project folder:
  1. Copy the content of `.env.example`.
  2. Create a new `.env` file and paste the copied content.  
  3. Set `AUTH_EMAIL` and `AUTH_PASSWORD` to your Gmail and the app password (in quotes).  

---

## 3. Deploy the Project on Vercel
- Sign up for Vercel and connect your GitHub account.  
- Import your forked project into Vercel.  
- Set the **Build Command** to `yarn build` and **Install Command** to `yarn install`.  
- Deploy the project.

---

## 4. Connect the Project to Sitepins CMS
- Sign up or log in to Sitepins CMS.  
- Connect your GitHub account.  
- Link your deployed project for content updates.  

You're done! 🎉
