const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobApplications = sequelize.define('JobApplications', {
  ID: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID'
  },
  JOBS_ID: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'JOBS_ID',
    references: {
      model: 'Jobs',
      key: 'ID'
    }
  },
  USER_ID: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'USER_ID',
    references: {
      model: 'Users',
      key: 'ID'
    }
  },
  USER_EMAIL: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'USER_EMAIL'
  },
  USER_NAME: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'USER_NAME'
  },
  USER_PHONE_NUMBER: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'USER_PHONE_NUMBER'
  },
  USER_BIRTH_DATE: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'USER_BIRTH_DATE'
  },
  USER_POSITION: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'USER_POSITION'
  },
  USER_INTRO: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'USER_INTRO'
  },
  STATUS: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'SUBMITTED',
    field: 'STATUS'
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'CREATED_AT'
  }
}, {
  tableName: 'Job_Applications',
  timestamps: false,
  underscored: false
});

module.exports = JobApplications;


