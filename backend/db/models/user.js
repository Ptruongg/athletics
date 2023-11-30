'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "User already exists"
        },
        validate: {
          len: [4, 30],
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        unique: {
          msg: "User with that email already exists"
        },
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword"] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
