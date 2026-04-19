# MEAN Stack CRUD Task Manager

This is a beautiful, light-mode, single-resource CRUD application built using the MEAN stack (MongoDB, Express.js, Angular, Node.js). It is optimized to be deployed seamlessly on Vercel utilizing Vercel Serverless Functions.

## 🚀 Features
- **Frontend**: Built with Angular 17+ and heavily stylized with pure Vanilla CSS for a soft glassmorphic, premium UI.
- **Backend**: Serverless-friendly Express.js architecture executing directly out of the `frontend/api` folder.
- **Database**: Mongoose models gracefully hooked to a MongoDB cluster.
- **UX**: Smart task styling using alternating light pastel colors generated automatically for empty statuses.

---

## 🛠️ How to run locally

This project simplifies the MEAN stack into a cohesive mono-folder (`frontend/`) to map elegantly onto modern edge-deployments. To run it locally:

### 1. Prerequisites
- Node.js installed.
- A MongoDB Connection String (Atlas Cluster).

### 2. Installation
Navigate into the frontend project root and install all dependencies (which cover both backend and frontend).

```bash
cd frontend
npm install
```

### 3. Environment Setup
Create a `.env` file right inside the `frontend/` folder. Add your MongoDB connection string like this:

```env
MONGODB_URI=mongodb+srv://<your_username>:<your_password>@yourcluster.mongodb.net/tasksapp?retryWrites=true&w=majority
```

### 4. Run the Servers
You need to start two processes locally (open two separate terminal windows).

**Terminal 1 (Backend API):**
```bash
cd frontend
node api/index.js
```
*Your Express API will spin up on `http://localhost:3000`.*

**Terminal 2 (Angular UI):**
```bash
cd frontend
npx ng serve
```
*Angular will spin up on `http://localhost:4200` using a proxy config to bypass CORS issues natively!*

Open [http://localhost:4200](http://localhost:4200) in your browser and enjoy!

---

## ☁️ How to deploy to Vercel

1. Import this repository into your Vercel Dashboard.
2. In the "Configure Project" step:
   - Set **Root Directory** to `frontend`.
   - Vercel will automatically detect the **Framework Preset** as `Angular`.
   - Leave the Build and Install commands **default / empty**.
3. Under Environment Variables, add `MONGODB_URI` with your connection string.
4. Click **Deploy**. Vercel will deploy the Angular site and dynamically convert the Express API into scalable serverless endpoints automatically!