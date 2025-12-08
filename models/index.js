const sequelize = require('../config/database');
const User = require('./User');
const Companies = require('./Companies');
const Jobs = require('./Jobs');
const JobApplications = require('./JobApplications');

// 모델 간 관계 설정
// Companies와 Jobs: 1:N 관계
Companies.hasMany(Jobs, {
  foreignKey: 'COMPANIES_ID',
  as: 'jobs',
});
Jobs.belongsTo(Companies, {
  foreignKey: 'COMPANIES_ID',
  as: 'company',
});

// Jobs와 JobApplications: 1:N 관계
Jobs.hasMany(JobApplications, {
  foreignKey: 'JOBS_ID',
  as: 'applications',
});
JobApplications.belongsTo(Jobs, {
  foreignKey: 'JOBS_ID',
  as: 'job',
});

// User와 JobApplications: 1:N 관계
User.hasMany(JobApplications, {
  foreignKey: 'USER_ID',
  as: 'applications',
});
JobApplications.belongsTo(User, {
  foreignKey: 'USER_ID',
  as: 'user',
});

// 데이터베이스 연결 및 동기화 함수
const syncDatabase = async (force = false) => {
  try {
    await sequelize.authenticate();
    console.log('데이터베이스 연결이 성공적으로 설정되었습니다.');

    await sequelize.sync({ force });
    console.log('모든 모델이 데이터베이스와 동기화되었습니다.');
  } catch (error) {
    console.error(
      '데이터베이스 연결 또는 동기화 중 오류가 발생했습니다:',
      error,
    );
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Companies,
  Jobs,
  JobApplications,
  syncDatabase,
};
