const errorHelper = require('../helpers/error.helper');
const userHelper = require('../helpers/user.helper');

const register = async (req, res) => {
  try {
    const data = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    if (data.password !== data.confirmPassword) {
      return errorHelper.handleError(res, 500, 'failed!');
    }

    await userHelper
      .register(data)
      .then(() => {
        return res.status(200).json({ result: true });
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const login = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    await userHelper.login(data).then((result) => {
      return res.status(200).json({
        result: true,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const data = {
      userID: req.body.userID,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    };
    if (!data.userID || !data.oldPassword || !data.newPassword) {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await userHelper
        .resetPassword(data)
        .then(() => {
          return res.status(200).json({
            result: true,
          });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
    }
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const getProfile = async (req, res) => {
  try {
    const ownerID = req.params.ownerID;
    if (!ownerID) {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await userHelper
        .getProfile(ownerID)
        .then((result) => {
          return res.status(200).json({
            result: true,
            data: result,
          });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
    }
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const updateAvatar = async (req, res) => {
  try {
    const data = {
      ownerID: req.body.ownerID,
      avatar: req.files.avatar,
    };
    if (!data.ownerID || !data.avatar) {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await userHelper
        .updateAvatar(data)
        .then(() => {
          return res.status(200).json({
            result: true,
          });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
    }
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = {
      ownerID: req.body.ownerID,
      fullName: req.body.fullName,
      password: req.body.password || ''
    };
    if (!data.ownerID) {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await userHelper
        .updateProfile(data)
        .then(() => {
          return res.status(200).json({
            result: true,
          });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
    }
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const data = {
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    };
    if (!data.phoneNumber || !data.email) {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await userHelper
        .forgotPassword(data)
        .then((result) => {
          return res.status(200).json({
            result: true,
            message: result.message,
          });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
    }
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const getListUser = async (req, res) => {
  try {
      await userHelper
        .getListUser()
        .then((result) => {
          return res.status(200).json({
            result: true,
            data: result
          });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const getListContact = async (req, res) => {
  try {
      await userHelper
        .getListContact()
        .then((result) => {
          return res.status(200).json({
            result: true,
            data: result
          });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const addContact = async (req, res) => {
  try {
      const data = {
        fullName: req.body.fullName,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
      }

      console.log(data);

      await userHelper
        .addContact(data)
        .then((result) => {
          return res.status(200).json({
            result: true,
            data: result
          });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

module.exports = {
  register: register,
  login: login,
  resetPassword: resetPassword,
  getProfile: getProfile,
  updateAvatar: updateAvatar,
  updateProfile: updateProfile,
  forgotPassword: forgotPassword,
  getListUser: getListUser,
  getListContact: getListContact,
  addContact: addContact
};
