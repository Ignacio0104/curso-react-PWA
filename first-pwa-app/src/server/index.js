const express = require("express");
const cors = require("cors");
const webpush = require("web-push");
const { json } = require("express");

//Middlewares
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json())

const pushSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/cNG-S2q6jLw:APA91bFICbE0xS64u2NnQZbRUtKGSLwUo0VD8gdS-5eYPz7fyRx1lsHf9oVSYTH8EqJiCiKQvpxIxFvKolY8PFsoWgdCJabLOvlKVt2eE2zlxZr21m73a-GmGJojTIGzTomd2S_ebSFQ',
    expirationTime: null,
    keys: {
        p256dh: 'BP5y76JoZkz8p5TQmO4U5W6jvnBxOaPPHUta3ybMm8aMheCCBCXtrtxINNg3U_1_0q5glvgw8GPZ_Ru36ysuOM8',
        auth: 'TmGHbkNbYrO81LVkHtZm1A'
  }
}


const vapidKeys = {
    publicKey:"BNGw9OpgYVjaTcpk7zRgQ9LyGXZPkUXpscz2nHAwiYbEbxXzjBMlM89_Ai-1uxy6Za1Wt97vjDbRxgk6TKhlWMQ",
    privateKey:"f2G33u7w6AblrRw38IPY_EPSNvWLPuPG9YkpOf47xQk"
  }

  webpush.setVapidDetails(
    "mailto:ignacio@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
  )

//Routes
app.get('/', async (req, res) => {

    const payload = JSON.stringify({ title: "Título de Notificación", message: "Mensaje de la notificación" });
    try {
        await webpush.sendNotification(pushSubscription, payload);
        await res.send("Enviado");
    } catch (e) { console.log(e) }
});


app.post("/subscription",(req,res)=>{
    res.sendStatus(200).json()
})

app.post("/customNotification",async (req,res)=>{
    try {
        await webpush.sendNotification(pushSubscription, JSON.stringify(req.body));
        await res.send("Enviado");
    } catch (e) { console.log(e) }
})



app.listen(8000,()=> console.log("Server listening on port 8000"))