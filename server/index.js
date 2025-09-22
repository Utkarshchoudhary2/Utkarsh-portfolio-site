const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON ||
  fs.readFileSync(process.env.SERVICE_ACCOUNT_FILE || './serviceAccountKey.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

async function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({error:'No token'});
  const idToken = authHeader.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    if (decoded.admin === true) {
      req.uid = decoded.uid;
      next();
    } else {
      return res.status(403).json({error:'Not authorized'});
    }
  } catch (err) {
    return res.status(401).json({error:'Invalid token'});
  }
}

app.get('/admin/users', verifyAdmin, async (req,res)=>{
  try {
    const listUsersResult = await admin.auth().listUsers(1000);
    const users = listUsersResult.users.map(u => ({
      uid: u.uid, email: u.email, metadata: u.metadata
    }));
    res.json({users});
  } catch (err) {
    res.status(500).json({error:'Server error'});
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log('Admin API running on', PORT));
