const Contact = require('../models/contact.model');


const Create = async (contact) => {
    return await Contact.create(contact);
}

const InsertMany = async (contacts) => {
    return await Contact.insertMany(contacts);
}

const Save = async () => {
    return await Contact.save();
}

const GetAll = async (skip, limit, searchTerm = '') => {
  const searchRegex = new RegExp(searchTerm, 'i');
  const filter = {
    isDeleted: false,
    $or: [
      { Name: searchRegex },
      { Phone: searchRegex },
      { Address: searchRegex },
    ],
  };

  return await Contact.find(filter).skip(skip).limit(limit);
};
const DeleteById = async (id) => {
    return await Contact.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
}

const GetById = async (id) => {
    return await Contact.findById(id ).where({ isDeleted: false });
}

const GetByUserId = async (userId, skip = 0, limit = 10) => {
    return await Contact.find({ user: userId, isDeleted: false })
      .skip(skip)
      .limit(limit);
  };

  const CountDocuments = async (searchTerm = '') => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const filter = {
      isDeleted: false,
      $or: [
        { Name: searchRegex },
        { Phone: searchRegex },
        { Address: searchRegex },
      ],
    };
  
    return await Contact.countDocuments(filter);
  };

  const CountUserDocuments = async (userId) => {
    return await Contact.countDocuments(userId, { isDeleted: false });
  };

  const updateContact = async (contactId, updatedData) => {
    return await Contact.findByIdAndUpdate(contactId, updatedData, { new: true });
  };


module.exports = {
  Create,
  InsertMany,
  GetAll,
  DeleteById,
  GetById,
  Save,
  GetByUserId,
  CountUserDocuments,
  updateContact,
  CountDocuments
};