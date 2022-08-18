const localPort = 3000
var port = process.env.PORT || localPort;

import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import cors from 'cors'
import http from 'http'
import os from 'os'
import fetch from "node-fetch"
import expressOpenIdConnect from 'express-openid-connect'

const { auth } = expressOpenIdConnect;
const { requiresAuth } = expressOpenIdConnect;

var appUrl = "https://lud-recipe-app.herokuapp.com"
if (port == localPort) {
  appUrl = `http://localhost:${localPort}`
  console.log(`Configured for running locally`);
}

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: appUrl,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
}

var app = express() // use the express framework to handle dynamic responses to different pages
  app.use(express.json()) // make sure express parses bodies with json
  app.use(cors()) // make sure we can access the api from the outside
  app.set("view engine", "ejs") // set view engine to ejs
  app.use(auth(config));
const apiUrl = "https://lud-recipe-api.herokuapp.com"

app.get('/isAuthenticated', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/", (req, res) => {
  var user = req.oidc.isAuthenticated()? req.oidc.user : null;
  
  const targetUrl = apiUrl + "/api/recipes"
  console.log(`Target url: ${targetUrl}`)
  fetch(targetUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      res.render("recipe-list", { data: data, url : appUrl, user: user })
    })
})

app.get("/recipes/:id", (req, res) => {
  var user = req.oidc.isAuthenticated()? req.oidc.user : null;
  
  const targetUrl = apiUrl + "/api/recipes/" + req.params.id
  console.log(`Target url: ${targetUrl}`)
  fetch(targetUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      res.render("recipe", { data: data, user: user})
    });
  })
  
  app.get("/add-recipe", requiresAuth(), (req, res) => {
  console.log(`Displaying page to add new recipe`);
  var user = req.oidc.isAuthenticated()? req.oidc.user : null;
  res.render("add-recipe", { user: user });
})

app.get("/edit/:id", requiresAuth(), (req, res) => {
  const targetUrl = apiUrl + "/api/recipes/" + req.params.id
  console.log(`Target url: ${targetUrl}`)
  fetch(targetUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      res.render("edit-recipe", { data: data })
    });
})

app.get('/getToken', requiresAuth(), (req, res) => {
  const targetUrl = `${process.env.AUTH0_DOMAIN}/oauth/token`
  
  const authBody = {
      'client_id': process.env.AUTH0_CLIENT_ID,
      'client_secret': process.env.AUTH0_CLIENT_SECRET,
      'audience':'https://lud-recipe-api.herokuapp.com',
      'grant_type':'client_credentials'
  }

  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(authBody)
  }
  fetch(targetUrl, config)
  .then((response) => response.json())
  .then((data) => {
    res.status(200).json(data.access_token);
  });
})

// make js, css and other static files available from the 
// __app__/static directory
// they are in public folder
app.use('/static', express.static('public'))

// listen on one port for connections to serve
var server = http.Server(app)
server.listen(port, function() {
    console.log(`Web server running on ${os.hostname()} port ${port}`)
    return true
})

