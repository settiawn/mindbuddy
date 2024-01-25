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
    DoctorProfileId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  Appointment.beforeCreate((x) => {
    x.code = 'P-' + Date.parse(new Date())

    switch(x.cost){
      case '1':
        x.cost = 30000
      break;
      case '2':
        x.cost = 60000
      break;
      case '3':
        x.cost = 90000
      break;
    }
  })
  return Appointment;
};