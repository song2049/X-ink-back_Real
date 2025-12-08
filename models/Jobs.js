const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Jobs = sequelize.define(
  'Jobs',
  {
    ID: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID',
    },
    COMPANIES_ID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'COMPANIES_ID',
      references: {
        model: 'Companies',
        key: 'ID',
      },
    },
    TITLE: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'TITLE',
    },
    JOB_DESCRIPTION: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'JOB_DESCRIPTION',
    },
    START_LINE: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'START_LINE',
    },
    DEAD_LINE: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'DEAD_LINE',
    },
    POSITION: {
      type: DataTypes.ENUM('프론트엔드', '백엔드', '블록체인'),
      allowNull: false,
      defaultValue: `프론트엔드`,
      field: 'POSITION',
    },
    STATUS: {
      type: DataTypes.ENUM('OPEN', 'CLOSED'),
      allowNull: false,
      defaultValue: 'OPEN',
      field: 'STATUS',
    },
    CREATED_AT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'CREATED_AT',
    },
  },
  {
    tableName: 'Jobs',
    timestamps: false,
    underscored: false,
  },
);

module.exports = Jobs;
