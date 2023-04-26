const userModel = require("../models/user.models");
const jwtHelper = require("../helpers/jwt.helper");
const cloudinary = require("../configs/cloud");
const contactModel = require("../models/contact.model");
const randomCode = async () => {
  let code = Math.random().toString(36).substr(2, 6);
  return code;
};
const randomPassword = async () => {
  let password = Math.random().toString(36).substr(2, 8);
  return password;
};

const register = (data) => {
  return new Promise(async (resolve, reject) => {
    const checkEmail = await userModel.findUserByEmail(data.email);
    if (checkEmail) {
      return reject({
        message: "Email của bạn đã được đăng kí một tài khoản khác!",
      });
    }

    const userData = {
      password: await userModel.hashPassword(data.password),
      fullName: data.fullName,
      email: data.email,
    };

    await userModel(userData)
      .save()
      .then(async (res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const login = (data) => {
  return new Promise(async (resolve, reject) => {
    const checkPhoneNumber = await userModel.findUserByEmail(data.email);
    console.log(data);
    if (!checkPhoneNumber) {
      return reject({
        message: "Số điện thoại chưa được đăng kí tài khoản!",
      });
    } else {
      const checkPassword = await checkPhoneNumber.comparePassword(
        data.password
      );

      console.log(checkPassword);
      if (checkPassword) {
        const userData = {
          _id: checkPhoneNumber._id,
          email: checkPhoneNumber.email,
          fullName: checkPhoneNumber.fullName,
          role: checkPhoneNumber.role,
        };

        const accessToken = await jwtHelper.generateToken(
          userData,
          process.env.ACCESS_TOKEN_SECRET,
          process.env.ACCESS_TOKEN_LIFE
        );
        const refreshToken = await jwtHelper.generateToken(
          userData,
          process.env.REFRESH_TOKEN_SECRET,
          process.env.REFRESH_TOKEN_LIFE
        );

        return resolve({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        return reject({ message: "Mật khẩu không chính xác!" });
      }
    }
  });
};

const resetPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    const findUser = await userModel.findUserByID(data.userID);
    if (findUser) {
      const checkPassword = await findUser.comparePassword(data.oldPassword);
      if (checkPassword) {
        const hashPassword = await userModel.hashPassword(data.newPassword);
        await userModel
          .updatePassword(data.userID, hashPassword)
          .then((res) => {
            return resolve(res);
          })
          .catch((error) => {
            return reject({ message: `query failed, ${error}` });
          });
      } else {
        return reject({ message: "Mật khẩu củ không chính xác" });
      }
    } else {
      return reject({ message: "userID không tồn tại" });
    }
  });
};

const getProfile = (ownerID) => {
  return new Promise(async (resolve, reject) => {
    await userModel
      .findUserByID(ownerID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const updateProfile = (data) => {
  return new Promise(async (resolve, reject) => {
    const newData = {
      ownerID: data.ownerID,
      fullName: data.fullName,
    };
    if (data.password != "") {
      const password = await userModel.hashPassword(data.password);
      newData.password = password;
    }
    await userModel
      .updateProfile(newData)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getListUser = () => {
  return new Promise(async (resolve, reject) => {
    await userModel
      .getListUser()
      .then((res) => {
        console.log(res);
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getListContact = () => {
  return new Promise(async (resolve, reject) => {
    await contactModel
      .getListContact()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const addContact = (data) => {
  return new Promise(async (resolve, reject) => {
    await contactModel(data)
      .save()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

module.exports = {
  register: register,
  login: login,
  getProfile: getProfile,
  updateProfile: updateProfile,
  resetPassword: resetPassword,
  getListUser: getListUser,
  getListContact: getListContact,
  addContact: addContact,
};
