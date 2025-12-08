const { Jobs } = require('../models');

const seedJobs = async () => {
  try {
    console.log('더미 공고 데이터 시딩 시작...');

    const dummyJobs = [
      {
        COMPANIES_ID: `1`,
        TITLE: '24시간 풀근무 가능한 개발자 찾습니다.',
        JOB_DESCRIPTION: `담당하게 될 업무는 이런것들이구요 또 이렇습니다 주요 역할은 이런것들입니다 상세정보는 여러줄 일 수도 있습니다.`,
        START_LINE: `2025-12-08`,
        DEAD_LINE: `2025-12-30`,
        POSITION: `프론트엔드`,
        STATUS: 'OPEN',
      },
      {
        COMPANIES_ID: `2`,
        TITLE: '우리회사의 발닦개 개발자를 찾습니다',
        JOB_DESCRIPTION: `담당하게 될 업무는 이런것들이구요 또 이렇습니다 주요 역할은 이런것들입니다 상세정보는 여러줄 일 수도 있습니다.`,
        START_LINE: `2025-12-08`,
        DEAD_LINE: `2025-12-30`,
        POSITION: `프론트엔드`,
        STATUS: 'OPEN',
      },
      {
        COMPANIES_ID: `3`,
        TITLE: '경력 50년 이상 백엔드 개발자님 모집',
        JOB_DESCRIPTION: `담당하게 될 업무는 이런것들이구요 또 이렇습니다 주요 역할은 이런것들입니다 상세정보는 여러줄 일 수도 있습니다.`,
        START_LINE: `2025-12-08`,
        DEAD_LINE: `2025-12-30`,
        POSITION: `백엔드`,
        STATUS: 'OPEN',
      },
      {
        COMPANIES_ID: `4`,
        TITLE: 'ChatGPT 암산 능력 가뿐히 이기는 개발자 찾아요',
        JOB_DESCRIPTION: `담당하게 될 업무는 이런것들이구요 또 이렇습니다 주요 역할은 이런것들입니다 상세정보는 여러줄 일 수도 있습니다.`,
        START_LINE: `2025-12-08`,
        DEAD_LINE: `2025-12-30`,
        POSITION: `백엔드`,
        STATUS: 'OPEN',
      },
      {
        COMPANIES_ID: `5`,
        TITLE: '구글 또는 애플에서 개발 해보셨던 분 우대합니다',
        JOB_DESCRIPTION: `담당하게 될 업무는 이런것들이구요 또 이렇습니다 주요 역할은 이런것들입니다 상세정보는 여러줄 일 수도 있습니다.`,
        START_LINE: `2025-12-08`,
        DEAD_LINE: `2025-12-30`,
        POSITION: `프론트엔드`,
        STATUS: 'OPEN',
      },
    ];

    let createdCount = 0;
    let skippedCount = 0;

    for (const jobsData of dummyJobs) {
      const existingJobs = await Jobs.findOne({
        where: { COMPANIES_ID: jobsData.COMPANIES_ID },
      });

      if (existingJobs) {
        skippedCount++;
        continue;
      }

      // 사용자 생성
      await Jobs.create({
        COMPANIES_ID: jobsData.COMPANIES_ID,
        TITLE: jobsData.TITLE,
        JOB_DESCRIPTION: jobsData.JOB_DESCRIPTION,
        START_LINE: jobsData.START_LINE,
        DEAD_LINE: jobsData.DEAD_LINE,
        POSITION: jobsData.POSITION,
        STATUS: jobsData.STATUS,
      });

      createdCount++;
    }

    console.log(`\n📊 공고 더미데이터 결과: 5개 생성`);
  } catch (error) {
    console.error('더미 데이터 생성 중 오류 발생:', error.message);
    throw error;
  }
};

module.exports = seedJobs;
