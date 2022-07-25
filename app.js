var port = process.env.PORT || 5001

import express from 'express'
import cors from 'cors'
import http from 'http'
import os from 'os'
import fetch from "node-fetch"

var app = express() // use the express framework to handle dynamic responses to different pages
  app.use(express.json()) // make sure express parses bodies with json
  app.use(cors()) // make sure we can access the api from the outside
  app.set("view engine", "ejs") // set view engine to ejs
  
const apiUrl = "https://lud-recipe-api.herokuapp.com"
const appUrl = "https://lud-recipe-app.herokuapp.com"

app.get("/", (req, res) => {
  const targetUrl = apiUrl + "/api/recipes"
  console.log(`Target url: ${targetUrl}`)
  fetch(targetUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      res.render("recipe-list", { data: data, url : appUrl })
    });
})

app.get("/recipes/:id", (req, res) => {
  
  const targetUrl = apiUrl + "/api/recipes/" + req.params.id
  // console.log(`Target url: ${targetUrl}`)
  fetch(targetUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      res.render("recipe", { data: data })
    });
})

app.get("/add-recipe", (req, res) => {
  res.render("add-update-recipe", { data: -1 })
})

app.get("/edit/:id", (req, res) => {
  const targetUrl = apiUrl + "/api/recipes/" + req.params.id
  console.log(`Target url: ${targetUrl}`)
  fetch(targetUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      res.render("add-update-recipe", { data: data })
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

