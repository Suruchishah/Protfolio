# Sanity CMS Studio & Client Handover Guide

This folder contains the complete **Sanity Studio CMS v3** setup for Suruchi Shah's portfolio website.

---

## Quick Setup & Deployment (3 Steps)

### Step 1: Initialize your Sanity Project
Open your terminal in the `./studio` directory:
```bash
cd studio
npx sanity@latest init
```
- Select **"Create new project"** (or choose an existing project if you already created one).
- Select **"Use existing schema"** (press `Y`).
- Choose dataset name: `production`.

### Step 2: Update `projectId` in `sanity.config.js` and `script.js`
Open `studio/sanity.config.js` and update:
```javascript
export default defineConfig({
  projectId: 'YOUR_PROJECT_ID_HERE', // replace with project ID generated in step 1
  dataset: 'production',
  ...
});
```

And in `script.js` (main website folder):
```javascript
const SANITY_CONFIG = {
  projectId: 'YOUR_PROJECT_ID_HERE',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
};
```

---

### Step 3: Launch & Deploy Sanity Studio for your Client

#### To test locally:
```bash
npx sanity dev
```
Open `http://localhost:3333` in your browser.

#### To deploy live to Sanity's free hosting:
```bash
npx sanity deploy
```
Choose a studio URL (e.g. `suruchi-shah.sanity.studio`).

---

## Inviting Your Client To Edit Content

1. Log into your [Sanity Management Dashboard](https://www.sanity.io/manage).
2. Select your project.
3. Go to **Members** -> **Invite member**.
4. Enter your client's email address and assign them the **Administrator** or **Editor** role.
5. Send your client the live Sanity Studio link (e.g., `https://suruchi-shah.sanity.studio`).

Your client can now log in anytime from any browser to update their portfolio content, hero details, experiences, education, services, and contact information!
