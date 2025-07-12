const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const ContactController = require("../controllers/contact.controller");
const router = express.Router();


router.get('/contacts', authMiddleware, ContactController.getUserContacts);


module.exports = router;
