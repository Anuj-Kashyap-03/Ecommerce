const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

/* This is a function that is used to register a user. */
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("Register a User");
  const { email, password } = req.body;
  // console.log(req.body);
  // console.log(email, password);
  const user = await User.create({
    email,
    password,
  });
  sendToken(user, 201, res);
});

/* This is a function that is used to login a user. */
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

/* This is a function that is used to logout a user. */
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

/* This is a function that is used to reset a user password. */
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

/* This is a function that is used to reset a user password. */
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  // console.log(req.body)

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

/* This is a function that is used to get user details. */
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

/* This is a function that is used to update a user password. */
 
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile Picture
exports.updateProfilePicture = catchAsyncErrors(async (req, res, next) => {
  const UsernewData = {};
  const Userpreviousdata = req.user;
  if (req.body.avatar) {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    UsernewData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    const user = await User.findByIdAndUpdate(req.user.id, UsernewData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    const avatar = Userpreviousdata.avatar;
    if (avatar.public_id) {
      await cloudinary.v2.uploader.destroy(avatar.public_id);
    }

    res.status(200).json({
      success: true,
      user,
    });
  } else {
    return next(new ErrorHander("Picture not Updated", 400));
  }
});

// update User Profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const Userpreviousdata = req.user;
  const UsernewData = {};
  // console.log("req",req)
  // console.log("Userpreviousdata", Userpreviousdata);
  if (
    req.body.firstname &&
    req.body.lastname &&
    req.body.email &&
    req.body.phone
  ) {
    UsernewData.firstname = req.body.firstname;
    UsernewData.lastname = req.body.lastname;
    UsernewData.email = req.body.email;
    UsernewData.phone = req.body.phone;
  } else {
    return next(new ErrorHander("All Fields are mantatory", 400));
  }

  const user = await User.findByIdAndUpdate(req.user.id, UsernewData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});
