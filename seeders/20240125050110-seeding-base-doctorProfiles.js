'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../doctors.json')
    .map((x) => {
      delete x.id
      x.createdAt = x.updatedAt = new Date()
      return x
    })
    await queryInterface.bulkInsert("DoctorProfiles", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DoctorProfiles")
  }
};
