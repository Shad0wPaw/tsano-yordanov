////////////////FOR ME .............
const os = require("os");
//////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 5000;
const express = require("express");
const app = express();
app.listen(port, () => console.log("Listening at 5000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const Datastore = require("nedb");
const siteEnterDatabase = new Datastore("database.db");
siteEnterDatabase.loadDatabase();



//GET
app.get("/api", (request, response) => {
  siteEnterDatabase.find({}, (err, data) => {
        response.json(data)
    })
});


//POST
app.post("/api", (request, response) => {
  const timeShow = new Date().toUTCString();
  request.body.time = timeShow;
  siteEnterDatabase.insert(request.body);
  response.json({
    status: "success",
    time: timeShow,
    latitude: request.body.lat,
    longitude: request.body.long,
  });
});