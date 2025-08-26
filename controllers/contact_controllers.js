const asynchandler = require("express-async-handler");
const Contact = require("../models/contactmodel");

// @desc Get all contacts
// @route GET /api/contacts
// @access Private
const getcontacts = asynchandler(async (req, res) => {
  // Correctly find contacts for the authenticated user only
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Create a new contact
// @route POST /api/contacts
// @access Private
const postcontacts = asynchandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Add the authenticated user's ID to the contact document
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

// @desc Get a single contact
// @route GET /api/contacts/:id
// @access Private
const getcontact = asynchandler(async (req, res) => {
  // Find the contact by its ID AND the authenticated user's ID for security
  const contact = await Contact.findOne({
    _id: req.params.id,
    user_id: req.user.id,
  });

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

// @desc Update a contact
// @route PUT /api/contacts/:id
// @access Private
const putcontacts = asynchandler(async (req, res) => {
  // Find the contact by its ID AND the authenticated user's ID for security
  const contact = await Contact.findOne({
    _id: req.params.id,
    user_id: req.user.id,
  });

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedcontact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedcontact);
});

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access Private
const deletecontact = asynchandler(async (req, res) => {
  // Find the contact by its ID AND the authenticated user's ID for security
  const contact = await Contact.findOne({
    _id: req.params.id,
    user_id: req.user.id,
  });

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await contact.deleteOne({_id : req.params.id});
  res.status(200).json(contact);
});

module.exports = {
  getcontacts,
  postcontacts,
  getcontact,
  putcontacts,
  deletecontact,
};
