const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us you name"],
      trim: true,
      maxlength: [40, "User name must be bellow 40 characters."],
      minlength: [3, "User name must be above 3 characters."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please tell us your email"],
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, "Please provide a password"],
      trim: true,
      minlength: [8, "The password needs to be greater than 8 characters"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "The passwords doesn´t match",
      },
      trim: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      default: "student",
      enum: ["student", "teacher", "admin"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      default: "true",
      type: Boolean,
      select: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Document middlewares:

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Virtual Populate
userSchema.virtual("courses", {
  ref: "CourseMerge",
  localField: "_id",
  foreignField: "students",
});

userSchema.virtual("createdCourses", {
  ref: "CourseMerge",
  localField: "_id",
  foreignField: "professor",
});

// Instance methods:

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;