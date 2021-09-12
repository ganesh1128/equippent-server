const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/hackathon";

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/all-products", async function (req, res) {
  try {
    //Connect the database
    let client = await mongoClient.connect(url);

    //select the DB
    let db = client.db("hackathon");

    //select the collection and perform the action
    let data = await db.collection("products").find({}).toArray();

    //close the connection
    client.close();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.post("/create-product", async function (req, res) {
  try {
    //Connect the database
    let client = await mongoClient.connect(url);

    //select the DB
    let db = client.db("hackathon");

    //select the collection and perform the action
    let data = await db.collection("products").insertOne(req.body);

    //close the connection
    await client.close();
    res.json({
      message: "Task Created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.listen(3000, function () {
  console.log("listening to 3000");
});