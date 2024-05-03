const User = require("../models/user.model.js");

const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError.js");
const nodemailer = require('nodemailer');
const sendEmailToAllUsers = require("../send-email.js");

const generateAccessToken = (user) => {
  const expiresInSeconds = 3 * 30 * 24 * 60 * 60;
  return jwt.sign(
    {
      id: user._id,
      isSeller: user.isSeller,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_KEY,
    { expiresIn: expiresInSeconds} // Adjust the expiration time as needed
  );
};



const sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    // Set up your email transport configuration
    // Example: SMTP transport
    host: 'roothq.africa',
    port: 465,
    secure: true,
    auth: {
      user: 'support@roothq.africa',
      pass: 'Vision.2032',
    },
  });

  const resetLink = `https://roothq.africa/change-password/${token}`; // Replace with your frontend reset password page URL

  // Send the email
  await transporter.sendMail({
    from: '"Root team" <support@roothq.africa>',
    to: email,
    subject: 'Password Reset Request',
    html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
  });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    

    console.log('User found:', user);

    if (!user) {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a reset token
    const resetToken = generateResetToken();
    

    // Save the reset token to the user in the database
    await User.findByIdAndUpdate(user._id, { resetToken, resetTokenExpiration: Date.now() + 3600000 }); // Expire in 1 hour

    // Send the password reset email
    await sendResetEmail(email, resetToken);

    // Respond with success
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { resetToken, newPassword } = req.body;

  try {
    // Log the reset token for debugging
    console.log('Reset Token received:', resetToken);

    // Find the user by the reset token
    const user = await User.findOne({ resetToken, resetTokenExpiration: { $gt: Date.now() } });



    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired reset token' });
    }

    // Update the user's password
    user.password = Crypto.AES.encrypt(newPassword, process.env.PASSWORD).toString();

    // Clear the reset token and expiration
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

  

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};



const register = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      phone,
      adminType,
      profilePictureUrl
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Password and confirm password do not match' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const profilePicture = req.file ? req.file.path : null;

    const newUser = new User({
      username,
      email,
      password: Crypto.AES.encrypt(req.body.password, process.env.PASSWORD).toString(),
      confirmPassword: Crypto.AES.encrypt(req.body.password, process.env.PASSWORD).toString(),
      phone,
      isAdmin: adminType === 'yes',
      profilePicture: profilePictureUrl,
    });

    await newUser.save();
    await sendEmailToAllUsers(email, username);


    const accessToken = generateAccessToken(newUser);
   
    const { ...userDetails } = newUser._doc;

    

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      })
     
      .status(201)
      .json({ message: 'User registered successfully', user: userDetails} );

  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.email === 1) {
        // Duplicate key error for email
        return res.status(400).json({ error: 'Email is already registered' });
      } else if (error.keyPattern.username === 1) {
        // Duplicate key error for username
        return res.status(400).json({ error: 'Username is already taken' });
      }
    }

    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found!"));

    const decryptedPassword = Crypto.AES.decrypt(user.password, process.env.PASSWORD).toString(Crypto.enc.Utf8);

    if (req.body.password !== decryptedPassword) {
      return next(createError(400, "Wrong password or username!"));
    }

    const accessToken = generateAccessToken(user);
 
    const { password, ...info } = user._doc;

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Login successful!",
          user: info,
      });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  // Clear the cookies containing tokens
  res
    .clearCookie("accessToken", {
      httpOnly: true,
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
    })
    .status(200)
    .send("User has been logged out.");
};
const editProfile = async (req, res, next) => {
  try {
    const userId = req.body.userId; // Assuming you store user information in req.user after authentication

    // Retrieve the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const existingEmailUser = await User.findOne({ email: req.body.email });
    if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    const existingUsernameUser = await User.findOne({ username: req.body.username });
    if (existingUsernameUser && existingUsernameUser._id.toString() !== userId) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // Update the user's profile based on the optional request body fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.profilePicture = req.body.profilePictureUrl || user.profilePictureUrl;

  
   
    // If newPassword is provided, change the password
    if (req.body.newPassword) {
      if (req.body.newPassword.length < 8) {
        return res.status(400).json({ error: "New password must be at least 8 characters long" });
      }
      const currentPassword = req.body.currentPassword;

      // Decrypt the stored password and verify with the current password
      const decryptedPassword = Crypto.AES.decrypt(user.password, process.env.PASSWORD).toString(Crypto.enc.Utf8);

      if (currentPassword !== decryptedPassword) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      // Encrypt the new password
      const encryptedNewPassword = Crypto.AES.encrypt(req.body.newPassword, process.env.PASSWORD).toString();
      user.password = encryptedNewPassword;
    }

    // Update the profile picture if provided
    

  

    // Save the updated user profile
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    next(error);
  }
};


module.exports = { register, login, logout, forgotPassword, changePassword, editProfile };