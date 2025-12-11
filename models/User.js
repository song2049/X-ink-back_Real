const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
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
    PHONE_NUMBER: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'PHONE_NUMBER',
    },
    BIRTH_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'BIRTH_DATE',
    },
    POSITION: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'POSITION',
    },
    INTRO: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'INTRO',
    },
    THUMBNAIL_URL: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'LOGO_URL',
      defaultValue:
        'https://x-ink-bucket.s3.ap-northeast-2.amazonaws.com/uploads/2cdeab4d-2ca1-461d-877c-78dd01f3cd3c.png',
    },
    CREATED_AT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'CREATED_AT',
    },
  },
  {
    tableName: 'Users',
    timestamps: false,
    underscored: false,
  },
);

module.exports = User;
