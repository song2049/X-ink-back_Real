const { Jobs, Companies, JobApplications } = require('../models');

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

/**
 * GET /jobs/detail/:id
 * 특정 공고 상세 정보 조회
 */
const getJobDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // Jobs 테이블에서 id로 조회 (Companies와 조인)
    const job = await Jobs.findOne({
      where: { ID: id },
      attributes: [
        'ID',
        'TITLE',
        'JOB_DESCRIPTION',
        'POSITION',
        'STATUS',
        'DEAD_LINE',
      ],
      include: [
        {
          model: Companies,
          as: 'company',
          attributes: ['NAME'],
        },
      ],
    });

    // 공고가 존재하지 않는 경우
    if (!job) {
      return res.status(404).json({
        success: false,
        message: '공고를 찾을 수 없습니다.',
      });
    }

    // 디데이 계산
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadLine = new Date(job.DEAD_LINE);
    deadLine.setHours(0, 0, 0, 0);

    const diffTime = deadLine - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dday = `D-${diffDays}`;

    // JobApplications 테이블에서 지원자 수 계산
    const volunteerCount = await JobApplications.count({
      where: { JOBS_ID: id },
    });

    // 응답 데이터 구성
    const result = {
      id: job.ID,
      companyName: job.company ? job.company.NAME : null,
      title: job.TITLE,
      jobDescription: job.JOB_DESCRIPTION,
      position: job.POSITION,
      status: job.STATUS,
      deadline: job.DEAD_LINE,
      dday: dday,
      volunteerCount: volunteerCount,
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error('공고 상세 조회 오류:', error);
    return res.status(500).json({
      success: false,
      message: '공고 상세 정보를 불러오는데 문제가 발생했습니다.',
    });
  }
};

module.exports = {
  getJobs,
  getJobDetail,
};
