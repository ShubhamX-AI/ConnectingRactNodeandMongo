const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors') 
const app = express()
const port = 8080

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://0.0.0.0:27017/assignment'); //connecting with the MongoDB localhost. Database name "assignment" 
  console.log("MonogDB connected")
}

const inputSchema = new mongoose.Schema({}); //making schema for the database

const sample_datas = mongoose.model('sample_datas',inputSchema) //Model with collection name "sample_datas" here the JSON file of sample data is imported

app.use(cors())//helps in making request from Front-End to Back-End sever.

app.get('/', async(req, res) => {
    const docs = await sample_datas.find({}); //help tto import hte JASON file in nodeJS server
    res.send(docs)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})