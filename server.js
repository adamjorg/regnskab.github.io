// import the neccessary libraries
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

// configure express server
app.use(express.static("./"));
app.use(express.json());
const port = 3001;

// configure database connection
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = "mongodb://localhost:27017/";

// configure security parameters
const saltRounds = 10;

// get request at root
app.get("/", (request, response) => {
  console.log("New user connecting. Loading site..");
  response.sendFile("/home-page.html");
});

// insert new data
app.post("/data", async (request, response) => {

    // receive and log the  data from the
    let data = request.body;
      console.log("Inserting data: " + JSON.stringify(data));
  
    // connect to the database and insert the data
    let db = await MongoClient.connect(url);
    let result = await db.db("mydb")
    .collection("data").insertOne(data);
  
    // log the the result and send response to client
    console.log("Inserted: " + JSON.stringify(data))
    response.json(data);
  
    // close the database
    db.close();
  });
  
  // get all data
  app.get("/data", async (request, response) => {
      console.log("Finding all data... ");
  
    let db = await MongoClient.connect(url);
    let result = await db.db("mydb")
    .collection("data").find({}).toArray();
  
    console.log(result);
    response.json({data: result});
    db.close();
  });

  //updating data
app.put("/data", async (request, response) => {

    let olddata = {_id: new ObjectID(request.body.dataID)};
    let newdata = { $set: {money: request.body.money}};
      console.log("Updating data of " + JSON.stringify(olddata) +
    " to:" + JSON.stringify(newdata));
  
    let db = await MongoClient.connect(url);
    let result = await db.db("mydb")
    .collection("data").updateOne(olddata, newdata);
  
    console.log("Updated data of " + JSON.stringify(olddata) +
    " to:" + JSON.stringify(newdata));
    response.json(request.body);
    db.close();
});


  // start server
app.listen(port, () => console.log("Listening on port " + port));