import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const sender = req.user;

    if (!message) {
      return res.status(400).json({ message: "Please provide a message" });
    }

    const newMessage = await Message.create({
      senderId: sender._id,
      name: sender.name,
      email: sender.email,
      message,
    });

    res
      .status(201)
      .json({ message: "Message saved successfully", data: newMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ senderId: req.user._id });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (message.senderId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await message.deleteOne();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message: newMessage } = req.body;
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (message.senderId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    message.message = newMessage || message.message;
    await message.save();

    res
      .status(200)
      .json({ message: "Note updated successfully", data: message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
