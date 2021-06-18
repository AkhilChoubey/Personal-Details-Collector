const express = require("express");
const request = require("request");
const https = require("https");
const port = process.env.PORT || 3000;

const { response } = require("express");
var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/20f3dbcbce";
  const options = {
    method: "POST",
    auth: "Akhil:f7610bc7822a5f8b8ccf6a5f0307071f-us6",
  };

  const request = https.request(url, options, function (reponse) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    reponse.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(port, function () {
  console.log("Server is running on port 3000");
});

// API Key--
// f7610bc7822a5f8b8ccf6a5f0307071f-us6

// Audience list id
//20f3dbcbce
