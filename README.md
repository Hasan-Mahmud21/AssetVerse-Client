AssetVerse | Corporate Asset Management System
AssetVerse is a comprehensive B2B digital platform designed to help companies efficiently manage their physical assets and track equipment distribution among employees. It streamlines the lifecycle of corporate property, from procurement and HR approval to employee returns.

🚀 Live Site
https://asset-verse-clientside.netlify.app/

📋 Project Overview
AssetVerse serves two primary user roles:

HR Managers: Can register their company, manage asset inventory (Returnable vs. Non-returnable), approve/reject employee requests, and monitor team affiliations.

Employees: Can request assets from registered companies, track their assigned equipment, and view their team members once affiliated with a company.

🔑 Credentials for Testing
HR Manager Admin: alex@morgan.com | alex1234

Employee: munna@gmail.com | munna1234

✨ Key Features

🏢 HR Management
Inventory Control: Full CRUD operations for assets with automated stock tracking.

Request Pipeline: A centralized dashboard to approve or reject asset requests with custom notes.

Auto-Affiliation: Employees are automatically added to the company roster upon their first approved request.

Package System: HRs start with a 5-employee limit.

Stripe Integration: Secure payment gateway to upgrade employee limits (Basic, Standard, Premium packages).

Reporting: Data visualization using charts to show most requested items and asset types.

👨‍💻 Employee Features
Request System: Browse available assets and request items with a simple modal interface.

My Assets: View a personalized list of pending and approved assets with PDF printing capabilities.

Team View: See colleagues within the same affiliated company.

Asset Returns: Easily return "Returnable" items to update the company inventory in real-time.

🛠️ Tech Stack & Packages
Frontend
UI Framework: React (Vite)

Styling: Tailwind CSS & DaisyUI

State Management & Data Fetching: TanStack Query (React Query) & Axios

Authentication: Firebase Authentication

Forms: React Hook Form

Other: Recharts (Analytics), React-to-print (PDF), SweetAlert2 (Modals), Stripe-js.

Backend
Runtime: Node.js

Framework: Express.js

Database: MongoDB with Mongoose ODM

Security: JSON Web Tokens (JWT) & Dotenv

Payments: Stripe Node SDK

⚙️ Setup & Installation

1. Clone the Repositories

git clone https://github.com/Hasan-Mahmud21/AssetVerse-Client
git clone https://github.com/Hasan-Mahmud21/AssetVerse-Server

2. Install Dependencies
Client Side:

cd Assetverse-Client
npm install

Server Side:
cd assetverse-server
npm install

3. Environment Configuration
Create a .env file in both the client and server directories.

Client (.env.local):

VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.appspot.com
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_STRIPE_PAYMENT_KEY=your_stripe_pk

Server (.env):

DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
CLIENT_URL=your_client_url
STRIPE_SECRET_KEY=your_stripe_sk

4. Run the Project
Server: npm start (or nodemon index.js) Client: npm run dev





