const { Jobs, Companies } = require('../models');

const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.findAll({
      attributes: [
        'ID',
        'COMPANIES_ID',
        'TITLE',
        'START_LINE',
        'DEAD_LINE',
        'POSITION',
        'STATUS',
      ],
      include: [
        {
          model: Companies,
          as: 'company',
          attributes: ['NAME'],
        },
      ],
    });

    // 디데이 데이터 가공
    const result = jobs.map((job) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const deadLine = new Date(job.DEAD_LINE);
      deadLine.setHours(0, 0, 0, 0);

      const diffTime = deadLine - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const dday = `D-${diffDays}`;

      return {
        id: job.ID,
        companyId: job.COMPANIES_ID,
        companyName: job.company ? job.company.NAME : null,
        title: job.TITLE,
        dday: dday,
        position: job.POSITION,
        status: job.STATUS,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Jobs 전체 공고 목록 오류:', error);
    return res.status(500).json({
      success: false,
      message: '공고 목록을 불러오는데 문제가 발생했습니다.',
    });
  }
};

module.exports = {
  getJobs,
};
