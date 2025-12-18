import User from "../models/userModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({ message: "Email already in use" });
        }
      }

      user.name = name || user.name;
      user.email = email || user.email;

      // We use findByIdAndUpdate to avoid running pre-save hook validation issues if any,
      // but actually for consistency with previous logic we can just use the updated fields.
      // However, to be safe against the 500 error which might be due to document handling:

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: user.name,
          email: user.email,
        },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      await user.deleteOne();
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
