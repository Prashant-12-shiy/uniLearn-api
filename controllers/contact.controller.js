import Contact from "../models/contact.model.js";

const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = new Contact({
      name,
      email,
      message,
    });

    await newMessage.save();

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMessage = async (req, res) => {
  try {
    const message = await Contact.find({});

    return res.status(200).json({
      success: true,
      message: "Message retrieved successfully",
      data: message,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Contact.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      data: message,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { sendMessage, getMessage,deleteMessage };
