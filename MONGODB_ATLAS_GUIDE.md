# Setting up MongoDB Atlas (Cloud Database)

Since Vercel is a cloud platform, it cannot access a database running on your personal computer (`localhost`). You need a cloud database. **MongoDB Atlas** is the standard, free choice.

## Step 1: Create an Account

1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  Sign up (you can use your Google account).
3.  Fill in the welcome questionnaire (or skip it).

## Step 2: Create a Cluster

1.  On the "Deploy a database" screen, select **M0 Free**.
2.  Choose a provider (AWS) and a region close to you (e.g., usually the default marked with "Free Tier Available").
3.  Name your cluster (e.g., "Cluster0") and click **Create**.

## Step 3: Create a Database User

1.  You will be asked to "Security Quickstart".
2.  **Username**: `admin` (or whatever you prefer).
3.  **Password**: Create a strong password. **Write this down!** You will need it in a minute.
4.  Click **Create User**.

## Step 4: Network Access (Important!)

1.  Scroll down to "IP Access List".
2.  Click **Add Entry** (or "My Local Environment" might be there).
3.  **Crucial for Vercel**: You must allow access from **anywhere**, because Vercel's IP addresses change.
    - Click **Allow Access from Anywhere**.
    - The IP Address field should show `0.0.0.0/0`.
    - Click **Add Entry**.
4.  Click **Finish and Close**.

## Step 5: Get Connection String

1.  Go to your **Database** dashboard (click "Database" on the left sidebar).
2.  Click the **Connect** button next to your cluster.
3.  Select **Drivers**.
4.  You will see a connection string looking like this:
    `manymongodb+srv://admin:<db_password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
5.  **Copy this string.**

## Step 6: Configure Your Project

### Part A: For Vercel (Deployment)

1.  Go to your **Backend Project** in Vercel.
2.  Settings > Environment Variables.
3.  Add a new variable:
    - **Key**: `MONGO_URI`
    - **Value**: Paste the string you copied.
    - **Replace `<db_password>`**: Manually delete `<db_password>` from the pasted string and type the actual password you created in Step 3.
4.  Click **Save**.
5.  **Redeploy** your backend for changes to take effect.

### Part B: For Local Development (Optional)

1.  In your `backend` folder, open `.env`.
2.  Update `MONGO_URI` with the same string (with the password filled in).
