const { validationResult } = require("express-validator");
const ContactRepository = require("../repositories/contact.repoistory");

addNewContact = async (req, res) => {
  console.log("Add new contact called", req.body);
  const userId = req.user.id;
  req.body.user = userId;
  console.log("Add new contact called", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const contact = req.body;
  await ContactRepository.Create(contact);
  res.status(201).json({
    message: "Contact created",
    contact: contact,
  });
};


const getUserContacts = async (req, res) => {
  console.log("From contact Controller");
  
  const userId = req.user.id;
  const userName = req.user.username;
  console.log(`Fetching contacts for user from token: ${userId}`);
  

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const contacts = await ContactRepository.GetByUserId(userId, skip, limit);
    const total = await ContactRepository.CountDocuments({ user: userId });

    res.json({
      contacts,
      paginationData: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllContacts = async (req, res) => {
  console.log("Get All Contacts Called");
  console.log(req.query);
    
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const searchTerm = req.query.searchTerm || '';

  try {
    const contacts = await ContactRepository.GetAll(skip, limit, searchTerm);
    const total = await ContactRepository.CountDocuments();

    res.json({
      contacts,
      paginationData: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

const deleteContactById = async (req, res) => {
  console.log("Delete Contact By Id Called");
  
  const contactId = req.params.id;
  console.log("Contact Id: ", contactId);
  try {
    const contact = await ContactRepository.DeleteById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateContact = async (req, res) => {
  const contactId = req.params.id;
  const updatedData = req.body;

  try {
    const updated = await ContactRepository.updateContact(contactId, updatedData);
    console.log("Updated Contact: ", updated);
    
    if (!updated) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact updated successfully', contact: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating contact', error: err.message });
  }
};

const getContactById = async (req, res) => {
  const contactId = req.params.id;

  try {
    const contact = await ContactRepository.GetById(contactId);

    if (!contact || contact.isDeleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports = {
  addNewContact,
  getUserContacts,
  getAllContacts,
  deleteContactById,
  updateContact,
  getContactById
};
