const Message = require("../models/Message");
const MentorshipRequest = require("../models/MentorshipRequest");

// =========================
// Get Chat Contacts
// =========================
const getChatContacts = async (req, res) => {
  try {
    const userId = req.user._id;

    let requests = [];

    if (req.user.role === "Student") {
      requests = await MentorshipRequest.find({
        student: userId,
        status: "Accepted",
      }).populate(
        "alumni",
        "name email skills industry"
      );
    } else if (req.user.role === "Alumni") {
      requests = await MentorshipRequest.find({
        alumni: userId,
        status: "Accepted",
      }).populate(
        "student",
        "name email skills industry"
      );
    }

    const uniqueContacts = new Map();

    requests.forEach((request) => {
      const contact =
        req.user.role === "Student"
          ? request.alumni
          : request.student;

      if (contact) {
        uniqueContacts.set(contact._id.toString(), contact);
      }
    });

    const contacts = await Promise.all(
      [...uniqueContacts.values()].map(async (contact) => {
        const unreadCount = await Message.countDocuments({
          sender: contact._id,
          receiver: req.user._id,
          isRead: false,
        });

        return {
          ...contact.toObject(),
          unreadCount,
        };
      })
    );

    res.status(200).json({
      contacts,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Send Message
// =========================
const sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;

    if (!receiver || !message) {
      return res.status(400).json({
        message: "Receiver and message are required",
      });
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver,
      message,
      isRead: false,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Conversation
// =========================
const getConversation = async (req, res) => {
  try {
    const otherUserId = req.params.userId;
    
    await Message.updateMany(
      {
        sender: otherUserId,
        receiver: req.user._id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    const messages = await Message.find({
      $or: [
        {
          sender: req.user._id,
          receiver: otherUserId,
        },
        {
          sender: otherUserId,
          receiver: req.user._id,
        },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name email")
      .populate("receiver", "name email");

    res.json({
      messages,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Clear Conversation
// =========================
const clearConversation = async (req, res) => {
  try {
    const otherUserId = req.params.userId;

    await Message.deleteMany({
      $or: [
        {
          sender: req.user._id,
          receiver: otherUserId,
        },
        {
          sender: otherUserId,
          receiver: req.user._id,
        },
      ],
    });

    res.status(200).json({
      message: "Conversation cleared successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getChatContacts,
  sendMessage,
  getConversation,
  clearConversation,
};