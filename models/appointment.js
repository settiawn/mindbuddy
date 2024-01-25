'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.User)
      Appointment.belongsTo(models.DoctorProfile)
    }
  }
  Appointment.init({
    code: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    date: DataTypes.DATE,
    DoctorId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  Appointment.beforeCreate((x) => {
    x.code = 'P-' + Date.parse(new Date())
  })
  return Appointment;
};