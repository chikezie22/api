import express from "express";
import axios from "axios";
import "dotenv/config";
const app = express();
const port = 3000;
// const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
// console.log(process.env);
const yourUsername = process.env.yourUsername;
const yourPassword = process.env.yourPassword;
const yourAPIKey = process.env.yourAPIKey;
const yourBearerToken = process.env.yourBearerToken;

// setting the ejs template
app.set("view engine", "ejs");

//load static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const result = await axios.get("https://bored-api.appbrewery.com/random");

    const content = JSON.stringify(result.data);

    res.render("index.ejs", { content: content });
  } catch (err) {
    console.log(err);
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try {
    const result = await axios.get(
      " https://secrets-api.appbrewery.com/all?page=1",
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    const content = JSON.stringify(result.data);
    res.render("index.ejs", { content: content });
  } catch (err) {
    console.log(err);
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const result = await axios.get(
      "https://secrets-api.appbrewery.com/filter?score=5",
      {
        params: {
          apiKey: yourAPIKey,
        },
      }
    );
    const content = JSON.stringify(result.data);
    res.render("index.ejs", { content: content });
  } catch (err) {
    console.log(err);
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try {
    const result = await axios.get(
      "https://secrets-api.appbrewery.com/secrets/1",
      {
        headers: {
          Authorization: `Bearer ${yourBearerToken}`,
        },
      }
    );
    const content = JSON.stringify(result.data);
    res.render("index.ejs", { content: content });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
