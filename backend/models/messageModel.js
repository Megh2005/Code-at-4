import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          console.log("Invalid email");
        }
      },
    },

    message: {
      type: String,
      required: true,
      minLength: 10,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
