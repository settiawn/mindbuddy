'use strict';
const {
  Model
} = require('sequelize');
const { convertPrice } = require('../helpers/convert');
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

    get getConverted(){
      return convertPrice(this.cost)
    }

    get formattedDate(){
      return this.date.toLocaleDateString('id-ID', {dateStyle: "full"});
  }
  }
  Appointment.init({
    code: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "date tidak boleh kosong"
        },
        notNull: {
          msg: "date tidak boleh kosong"
        },
        minimumDate() {
          let now = Date.parse(new Date())
          let appointmentDate = Date.parse(this.date)
          let interval = appointmentDate - now
          if(interval < 0){
            throw new Error("appointment date tidak boleh di waktu lampau")
          }
        }
      }
    },
    DoctorProfileId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  Appointment.beforeCreate((x) => {
    x.code = 'P-' + Date.parse(new Date())

    switch(x.cost){
      case 'checkup':
        x.cost = 50000
      break;
      case 'consultation':
        x.cost = 80000
      break;
      case 'medical':
        x.cost = 100000
      break;
    }
  })
  return Appointment;
};