const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Companies = sequelize.define(
  'Companies',
  {
    ID: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID',
    },
    EMAIL: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'EMAIL',
    },
    PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'PASSWORD',
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'NAME',
    },
    ADDRESS: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ADDRESS',
    },
    PHONE: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'PHONE',
    },
    DESCRIPTION: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'DESCRIPTION',
    },
    LOGO_URL: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'LOGO_URL',
    },
    BUSINESS_NUMBER: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'BUSINESS_NUMBER',
    },
    CREATED_AT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'CREATED_AT',
    },
  },
  {
    tableName: 'Companies',
    timestamps: false,
    underscored: false,
  },
);

module.exports = Companies;
