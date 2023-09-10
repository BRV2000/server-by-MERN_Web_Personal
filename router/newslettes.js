const express = require("express");
const NewsletterController = require("../controllers/newsletter");
const md_auth = require("../middlewares/aunthenticated");

const api = express.Router();

api.post("/newsletter",NewsletterController.suscribeEmail);
api.get("/newsletter",[md_auth.asureAuth],NewsletterController.getEmails);
api.delete("/newsletter/:id",[md_auth.asureAuth],NewsletterController.deleteEmails);


module.exports = api;
