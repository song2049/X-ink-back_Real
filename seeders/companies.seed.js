const bcrypt = require('bcrypt');
const { Companies } = require('../models');

const seedCompanies = async () => {
  try {
    console.log('더미 기업 데이터 시딩 시작...');

    const dummyCompanies = [
      {
        EMAIL: `admin1@test.com`,
        PASSWORD: `admin`,
        NAME: `1등기업`,
        ADDRESS: `서울시 중량구 머시기 어쩌고`,
        PHONE: `01012345678`,
        DESCRIPTION: `사람이 우선이다 1등 기업 입니다.`,
        BUSINESS_NUMBER: `1234-456-789`,
      },
      {
        EMAIL: `admin2@test.com`,
        PASSWORD: `admin`,
        NAME: `2등기업`,
        ADDRESS: `서울시 중량구 머시기 어쩌고`,
        PHONE: `01012345678`,
        DESCRIPTION: `사람이 우선이다 2등 기업 입니다.`,
        BUSINESS_NUMBER: `1234-456-789`,
      },
      {
        EMAIL: `admin3@test.com`,
        PASSWORD: `admin`,
        NAME: `3등기업`,
        ADDRESS: `서울시 중량구 머시기 어쩌고`,
        PHONE: `01012345678`,
        DESCRIPTION: `사람이 우선이다 3등 기업 입니다.`,
        BUSINESS_NUMBER: `1234-456-789`,
      },
      {
        EMAIL: `admin4@test.com`,
        PASSWORD: `admin`,
        NAME: `4등기업`,
        ADDRESS: `서울시 중량구 머시기 어쩌고`,
        PHONE: `01012345678`,
        DESCRIPTION: `사람이 우선이다 4등 기업 입니다.`,
        BUSINESS_NUMBER: `1234-456-789`,
      },
      {
        EMAIL: `admin5@test.com`,
        PASSWORD: `admin`,
        NAME: `5등기업`,
        ADDRESS: `서울시 중량구 머시기 어쩌고`,
        PHONE: `01012345678`,
        DESCRIPTION: `사람이 우선이다 5등 기업 입니다.`,
        BUSINESS_NUMBER: `1234-456-789`,
      },
    ];

    let createdCount = 0;
    let skippedCount = 0;

    for (const companiesData of dummyCompanies) {
      const existingCompanies = await Companies.findOne({
        where: { EMAIL: companiesData.EMAIL },
      });

      if (existingCompanies) {
        skippedCount++;
        continue;
      }

      // 비밀번호 해시화 (salt rounds: 10)
      const hashedPassword = await bcrypt.hash(companiesData.PASSWORD, 10);

      // 사용자 생성
      await Companies.create({
        EMAIL: companiesData.EMAIL,
        PASSWORD: hashedPassword,
        NAME: companiesData.NAME,
        ADDRESS: companiesData.ADDRESS,
        PHONE: companiesData.PHONE,
        DESCRIPTION: companiesData.DESCRIPTION,
        BUSINESS_NUMBER: companiesData.BUSINESS_NUMBER,
      });

      createdCount++;
    }

    console.log(`\n📊 기업 더미데이터 결과: 5개 생성`);
  } catch (error) {
    console.error('더미 데이터 생성 중 오류 발생:', error.message);
    throw error;
  }
};

module.exports = seedCompanies;
