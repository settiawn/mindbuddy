'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../user-doctor.json').map((x) => {
      delete x.id
      x.createdAt = x.updatedAt = new Date()
      return x
    })
    await queryInterface.bulkInsert("Users", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users")
  }
};
