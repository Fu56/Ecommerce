# Deploying Ecommerce App to Vercel

This guide will walk you through deploying your Ecommerce application to Vercel. Because you have a separate Backend and Frontend, we will deploy them as **two separate projects** on Vercel.

## Prerequisites

1.  **GitHub Account**: Your code must be pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **Environment Variables**: Have your `.env` file values ready (MongoDB URL, Secret Keys, etc.).

---

## Step 1: Push to GitHub

If you haven't already, push your code to a GitHub repository.

1.  Initialize git if needed: `git init`
2.  Add files: `git add .`
3.  Commit: `git commit -m "Ready for deployment"`
4.  Push to your remote repository.

---

## Step 2: Deploy Backend

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"**.
2.  Import your GitHub repository.
3.  **Configure Project**:
    - **Project Name**: e.g., `ecommerce-backend`
    - **Root Directory**: Click "Edit" and select `backend`. **This is important.**
    - **Framework Preset**: Select **Other** (or just leave default, Vercel detects `vercel.json`).
    - **Environment Variables**: Add all variables from your backend `.env` file here:
      - `PORT`: `8080` (Optional, Vercel manages this, but good to have)
      - `MONGO_URL`: Your MongoDB connection string
      - `JWT_SECRET`: Your secret key
      - `BRAINTREE_...`: If you use payment gateways.
4.  Click **Deploy**.
5.  **Copy the Domain**: Once deployed, you will get a domain like `https://ecommerce-backend.vercel.app`. **Copy this URL.**

---

## Step 3: Deploy Frontend

1.  Go to your Vercel Dashboard again and click **"Add New..."** -> **"Project"**.
2.  Import the **SAME** GitHub repository.
3.  **Configure Project**:
    - **Project Name**: e.g., `ecommerce-frontend`
    - **Root Directory**: Click "Edit" and select `frontend/client`. **This is crucial.**
    - **Framework Preset**: Vercel should auto-detect **Vite**. If not, select it.
    - **Environment Variables**:
      - Add a new variable named `VITE_API`
      - Value: The **Backend URL** you copied in Step 2 (e.g., `https://ecommerce-backend.vercel.app`).
      - **Important**: Do NOT add a trailing slash `/`.
4.  Click **Deploy**.

## Troubleshooting

- **CORS Issues**: If you see CORS errors, ensure your Backend `server.js` has `cors` enabled (it is enabled in your code).
- **White Screen**: Check the Console (F12) for errors. If it says "Network Error", check if `VITE_API` is set correctly.
