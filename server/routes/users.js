"use strict";

const UserHelper    = require("../lib/util/user-helper");
const express       = require("express");
const usersRoutes   = express.Router()

module.exports = function(DataHelpers) {

  usersRoutes.get("/", function(req, res) {
    DataHelpers.getUsers((err, users) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(users);
      }
    });
  });

  usersRoutes.post("/", function(req, res) {
    if (!req.body.email && !req.body.handle && !req.body.password) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = {
      username: req.body.username,
      handle: req.body.handle,
      password: req.body.password
    }

    DataHelpers.saveUsers(user, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return usersRoutes;

}