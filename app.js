const express = require('express');
const https = require("https");
const app = express()
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("home");
});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const unit = "units=metric"
  const apiKey = "7ee464c85f036e0568018df80b538645";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&" + unit + "&appid=" + apiKey + ""

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
        console.log(req.body.cityName);

        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const location = query.charAt(0).toUpperCase() + query.slice(1);
        const imageURL = 'http://openweathermap.org/img/wn/' + icon +  '@2x.png';


        res.render("weather", {temp: temp, description: description, icon:icon, location: location, imageURL:imageURL});
    })
  })});






//Run server//

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running on port 3000");
});
