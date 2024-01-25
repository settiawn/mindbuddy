'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DoctorProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    photo: DataTypes.STRING,
    clinic: DataTypes.TEXT,
    description: DataTypes.TEXT,
    specialty: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DoctorProfile',
  });
  return DoctorProfile;
};