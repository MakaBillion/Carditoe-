# CarditOe': South Africa's Eco-Smart Loyalty & Micro-Savings Platform

This project is set up for easy deployment to **Vercel** or **GitHub Pages**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnew)

## Option 1: Automatic Deployment to GitHub Pages (Recommended)

This project includes a GitHub Actions workflow in `.github/workflows/deploy.yml`. 

1. Push your code to a GitHub repository.
2. Go to your repository settings on GitHub.
3. Select **Pages** from the sidebar.
4. Under **Build and deployment > Source**, ensure **GitHub Actions** is selected.
5. Every time you push to the `main` branch, your site will automatically build and deploy!

## Option 2: Manual Deployment

If you prefer to deploy manually from your local machine:

1. Update the `homepage` field in `package.json` with your actual URL:
   `"homepage": "https://your-username.github.io/your-repo-name"`
2. Run the deployment script:
   ```bash
   npm run deploy
   ```

## Note on Routing

This project uses `HashRouter` from `react-router-dom` to ensure that deep links work correctly when hosted on GitHub Pages without requiring additional configuration to handle 404 redirects. Your URLs will look like `https://.../#/app`.


To run the app locally:

```bash
npm install
npm run dev
```

## Environment Variables

If your app uses the Gemini API, you need to set up the `GEMINI_API_KEY` in your GitHub repository secrets if you plan to use it in your build process, although typically these keys shouldn't be baked into a public static site's build.
