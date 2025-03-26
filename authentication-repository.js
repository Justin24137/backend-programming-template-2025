const { Users } = require('../../../models');

async function getUserDetails() {
    return Users.find({});
}

async function getUserDetail() {
    return Users.find({});
}

async function login(email, password) {
    return Users.create({ email, password});
  }

module.exports = {
    getUserDetails,
    getUserDetail,
    login,
};
