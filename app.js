var port = process.env.PORT || 5001

// var express = require('express')
// const cors = require('cors')
// var http = require('http')
// const { hostname } = require('os')

import express from 'express'
import cors from 'cors'
import http from 'http'
import os from 'os'
import fetch from "node-fetch"

const { hostname } = os.hostname

var app = express() // use the express framework to handle dynamic responses to different pages
  app.use(express.json()) // make sure express parses bodies with json
  app.use(cors()) // make sure we can access the api from the outside
  app.set("view engine", "ejs") // set view engine to ejs

var server = http.Server(app)

const apiUrl = "https://lud-recipe-api.herokuapp.com"
const appUrl = "https://lud-recipe-app.herokuapp.com"

const recipeList = [
    { id: 1, name: "Mat", taste: "digg", link: "recipes/1" },
    { id: 2, name: "Drikk", taste: "usch", link: "recipes/2" },
    { id: 3, name: "Hulda", taste: "nja", link: "recipes/3" }
]

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
  console.log(`Target url: ${targetUrl}`)
  fetch(targetUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      res.render("recipe", { data: data })
    });
})

app.get("/add-recipe", (req, res) => {
  res.render("add-recipe")
})


server.listen(port, function() {
    console.log(`Web server running on ${hostname} port ${port}`)
    return true
})