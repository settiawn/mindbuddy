'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    cariUmur(date){
      let now = new Date().getFullYear()
      return Math.abs(now - date.getFullYear())
    }

    static associate(models) {
      UserProfile.belongsTo(models.User);
    }

    get namaLengkap(){
      return `${this.firstName} ${this.lastName}`
    }
  }
  UserProfile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "nama depan tidak boleh kosong"
        },
        notNull: {
          msg: "nama depan tidak boleh kosong"
        },
        minimumLength() {
          if(this.firstName.length < 2){
            throw new Error("nama depan Harus minimal 3 karakter")
          }
        }
      }
    },
    lastName: {
      type: DataTypes.TEXT
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Birthday tidak boleh kosong"
        },
        notNull: {
          msg: "Birthday tidak boleh kosong"
        },
        apakahUmurValid() {
          const umur = this.cariUmur(this.dateOfBirth)
          if (umur < 17) {
            throw new Error('Umur harus di atas 17 tahun');
          }
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "address tidak boleh kosong"
        },
        notNull: {
          msg: "address tidak boleh kosong"
        },
        minimumLength() {
          if(this.address.length < 20){
            throw new Error("address Harus minimal 20 karakter")
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};