'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserProfile);
      User.hasOne(models.DoctorProfile);
      User.hasMany(models.Appointment);
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((x) => {
    x.role = 'patient'

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(x.password, salt);
    
    x.password = hash
  });
  return User;
};