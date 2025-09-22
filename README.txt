# Portfolio with Firebase Auth

This integrates Firebase Authentication (Email/Password).

## Setup
1. Go to https://console.firebase.google.com and create a project.
2. Enable Authentication → Email/Password.
3. Add a Web App and copy the config.
4. Paste the config into `assets/firebase-config.js`.

## Pages
- login.html → Login form (Firebase Auth)
- signup.html → Registration form
- index.html → Home (after login)
- admin.html → List registered users (admin only)
- projects.html, resume.html, game.html → Portfolio content

## Server
See `server/` folder: Node/Express app with Firebase Admin SDK.
Deploy to Render/Railway/Heroku/Cloud Run.
Provide your Firebase Service Account JSON via environment variable.

## Admin setup
1. Register yourself via signup.html
2. Get your UID from Firebase Console → Authentication → Users
3. Use the provided server script (`set-admin.js`) to set yourself as admin.

Once admin, admin.html shows registered users.
