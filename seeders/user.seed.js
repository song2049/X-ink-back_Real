const bcrypt = require('bcrypt');
const { User } = require('../models');

/**
 * user 테이블 더미 데이터 생성
 * - 서버 시작 시 자동으로 실행됨
 * - 중복 이메일은 생성하지 않음
 */
const seedUser = async () => {
  try {
    console.log('더미 사용자 데이터 시딩 시작...');

    // 더미 사용자 데이터 정의
    const dummyUsers = [
      {
        EMAIL: 'test1@test.com',
        NAME: '테스트유저1',
        PASSWORD: 'admin',
        PHONE_NUMBER: '01012345678',
        BIRTH_DATE: '2025-12-04',
      },
      {
        EMAIL: 'test2@test.com',
        NAME: '테스트유저2',
        PASSWORD: 'admin',
        PHONE_NUMBER: '01012345678',
        BIRTH_DATE: '2025-12-04',
      },
      {
        EMAIL: 'test3@test.com',
        NAME: '테스트유저3',
        PASSWORD: 'admin',
        PHONE_NUMBER: '01012345678',
        BIRTH_DATE: '2025-12-04',
      },
      {
        EMAIL: 'test4@test.com',
        NAME: '테스트유저4',
        PASSWORD: 'admin',
        PHONE_NUMBER: '01012345678',
        BIRTH_DATE: '2025-12-04',
      },
      {
        EMAIL: 'test5@test.com',
        NAME: '테스트유저5',
        PASSWORD: 'admin',
        PHONE_NUMBER: '01012345678',
        BIRTH_DATE: '2025-12-04',
      },
    ];

    let createdCount = 0;
    let skippedCount = 0;

    // 각 사용자 데이터 처리
    for (const userData of dummyUsers) {
      // 이미 존재하는 이메일인지 확인
      const existingUser = await User.findOne({
        where: { EMAIL: userData.EMAIL },
      });

      if (existingUser) {
        skippedCount++;
        continue;
      }

      // 비밀번호 해시화 (salt rounds: 10)
      const hashedPassword = await bcrypt.hash(userData.PASSWORD, 10);

      // 사용자 생성
      await User.create({
        EMAIL: userData.EMAIL,
        NAME: userData.NAME,
        PASSWORD: hashedPassword,
        PHONE_NUMBER: userData.PHONE_NUMBER,
        BIRTH_DATE: userData.BIRTH_DATE,
      });

      createdCount++;
    }

    console.log(`\n📊 유저 더미데이터 결과: 5명 생성`);
  } catch (error) {
    console.error('더미 데이터 생성 중 오류 발생:', error.message);
    throw error;
  }
};

module.exports = seedUser;
