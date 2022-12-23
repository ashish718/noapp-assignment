require("dotenv").config();
const express = require("express");

const app = express();
const multer = require('multer');
const csv=require('csvtojson')
let {verifyToken, genToken} = require('./middleware/auth')
const port = process.env.PORT || 5000;

let db = require("./config/database.js")

const {Worker} = require('worker_threads')

let {fetchContact} = require('./service/contactService')

const upload = multer({
  storage: multer.memoryStorage(),
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Active");
});

//generate token
app.post('/gen/token', async(req, res) => {
  try {
    const token = await genToken()
    console.log(token, "token---");
    return res.status(200).json({token, message:"sucess"});
  } catch (e) {
    return res.status(400).json({message: "issue in geneate token", error:e})
  }
})

//checkk token valid
app.get('/verify/token', verifyToken, async(req, res) => {
  res.status(200).send('verified')
})

//save contact from csv file
app.post('/contact', verifyToken, upload.single('file'), async(req, res) => {
  try {
    console.log(req.user, "decode user data req is----");
    let list_csv = await csv().fromString(req.file.buffer.toString());
    list_csv = JSON.stringify(list_csv);
    list_csv = JSON.parse(list_csv);
    console.log(list_csv);

    const saveContactWorker = new Worker('./worker/save-contact-worker.js')
    await saveContactWorker.postMessage(list_csv)
    return res.status(200).json({message: 'contact uploaded successfully'});
  } catch (e) {
    return res.status(400).json({message: "contact upload issue", error:e})
  }
})

app.get('/get/contact', verifyToken, async (req, res) => {
  try {
    let contactData = await fetchContact()
    return res.status(200).json({message: 'success', data: contactData});
  } catch (e) {
    return res.status(400).json({message: "contact upload issue", error:e})
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
