const express = require("express");
const ContactControler = require("../controllers/contact.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
const contactValidation = [
    body("Name").notEmpty().withMessage("Name is required"),
    body("Phone").notEmpty().withMessage("Phone is required"),
    body("Address").notEmpty().withMessage("Address is required"),
    body("notes").optional().isString().withMessage("Notes must be a string"),
    // body("user")
    //     .notEmpty()
    //     .withMessage("User ID is required")
    //     .isMongoId()
    //     .withMessage("Invalid User ID format"),
];

router.post("/", authMiddleware, contactValidation, ContactControler.addNewContact);
router.get("/", authMiddleware, ContactControler.getAllContacts);
router.delete("/:id", authMiddleware, ContactControler.deleteContactById);
router.put("/:id", authMiddleware,contactValidation, ContactControler.updateContact);
router.get("/:id", authMiddleware, ContactControler.getContactById);

module.exports = router;
