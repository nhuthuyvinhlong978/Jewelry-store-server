const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    gender: { type: String, default: "" },
    address: { type: String, default: "" },
    role: { type: String, default: "user" },
    block: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.password);
  },
};

UserSchema.statics = {
  getUser() {
    return this.find().exec();
  },
  getUserByRole(role) {
    return this.find({ role: role }).exec();
  },
  findUserByEmail(email) {
    return this.findOne({ email: email }).exec();
  },
  findUserByPhoneNumber(phoneNumber) {
    return this.findOne({ phoneNumber: phoneNumber }).exec();
  },
  findUserByID(ownerID) {
    return this.findOne({ _id: ownerID }).exec();
  },
  findUserByCode(code) {
    return this.find({ code: code }).exec();
  },
  updatePassword(ownerID, newPassword) {
    return this.findByIdAndUpdate(
      ownerID,
      {
        $set: {
          password: newPassword,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  updateProfile(data, avatar) {
    if (data.password) {
      return this.findByIdAndUpdate(
        data.ownerID,
        {
          $set: {
            fullName: data.fullName,
            password: data.password,
            // address: data.address,
          },
        },
        { safe: true, upsert: true, new: true }
      ).exec();
    } else {
      return this.findByIdAndUpdate(
        data.ownerID,
        {
          $set: {
            fullName: data.fullName,
            // address: data.address,
          },
        },
        { safe: true, upsert: true, new: true }
      ).exec();
    }
  },
  updateAvatar(ownerID, avatar) {
    return this.findByIdAndUpdate(
      ownerID,
      {
        $set: {
          avatar: avatar,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  blockAuthor(ownerID, status) {
    return this.findByIdAndUpdate(
      ownerID,
      {
        $set: {
          block: status,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  getListUser() {
    return this.find({ role: "user" });
  },
};

module.exports = mongoose.model("User", UserSchema);
module.exports.hashPassword = async (password) => {
  console.log("password", password);
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Hashing failed");
  }
};
