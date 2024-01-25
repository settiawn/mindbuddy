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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "email tidak boleh kosong"
        },
        notNull: {
          msg: "email tidak boleh kosong"
        },
        isEmail: {
          msg: "Harus berupa format email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password tidak boleh kosong"
        },
        notNull: {
          msg: "password tidak boleh kosong"
        },
        minimumLength() {
          if(this.password.length < 8){
            throw new Error("Password Harus minimal 8 karakter")
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
    }
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