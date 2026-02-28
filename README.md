# Shoolin Textiles

Modern React 19 + Vite application for Shoolin Textiles, featuring GSAP animations and Tailwind CSS.

## Deployment to GitHub Pages

To deploy this project to GitHub Pages, you can use the `gh-pages` package or set up a GitHub Actions workflow.

### Option 1: Using `gh-pages` package (Manual Deployment)

1. First, make sure you have the `gh-pages` package installed:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Update your `package.json` with the following configuration:
   - Add a `homepage` field at the top level: `"homepage": "https://<your-username>.github.io/<repository-name>/",`
   - Add deployment scripts in the `"scripts"` section:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
     ```

3. Update your `vite.config.js` to include the `base` path (which should match your repository name):
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/<repository-name>/', // Replace with your repo name
   })
   ```

4. Deploy your application by running:
   ```bash
   npm run deploy
   ```

### Option 2: Using GitHub Actions (Automated Deployment)

1. Ensure your `vite.config.js` has the correct `base` path set to your repository name:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/<repository-name>/', // Replace with your repo name
   })
   ```

2. Create a workflow file in your repository at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main # or your default branch

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Troubleshooting Deployment Errors (Common Issues)

If you see an error saying `Branch "gemini3-wb" is not allowed to deploy to github-pages due to environment protection rules`, this is because GitHub's default `github-pages` environment is restricted to the default branch (`main`).

### How to fix:
1. In your GitHub repository, go to **Settings** -> **Environments**.
2. Click on the **github-pages** environment.
3. Under **Deployment branches and tags**, change the restriction from "Selected branches" to **"All branches"**, OR add `gemini3-wb` to the allowed branches.
4. Go to the **Actions** tab and **re-run** the failed job.

---

4. Push your code to the `gemini3-wb` branch. GitHub Actions will automatically build and deploy your application to GitHub Pages.
