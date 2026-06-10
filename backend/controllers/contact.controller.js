import Contact from "../models/contact.model.js";
import { sendContactMail } from "../utils/sendMail.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    await sendContactMail({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        returnDocument: "after",
      },
    );

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      message: "Marked as read",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
