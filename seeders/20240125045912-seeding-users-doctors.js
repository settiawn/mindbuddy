'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../user-doctor.json').map((x) => {
      delete x.id
      x.createdAt = x.updatedAt = new Date()

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(x.password, salt);
      x.password = hash

      return x
    })
    await queryInterface.bulkInsert("Users", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users")
  }
};
