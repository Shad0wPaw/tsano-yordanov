////////////////FOR ME .............
const os = require("os");
//////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 3030;
const express = require("express");
const app = express();
app.listen(port, () => console.log(`server started on port ${port}`));
app.use(express.static(__dirname + '/public/'));
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