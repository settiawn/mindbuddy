'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("DoctorProfiles", "UserId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("DoctorProfiles", "UserId")
  }
};
