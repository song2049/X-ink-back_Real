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

/**
 * POST /jobs
 * 공고 생성
 */
const createJob = async (req, res) => {
  try {
    // req.user는 authMiddleware에서 설정됨
    const payload = req.user;

    // role이 "companies"가 아닌 경우
    if (payload.role !== 'companies') {
      return res.status(403).json({
        success: false,
        message: '권한이 없습니다.',
      });
    }

    // 필수값 검증
    const { title, position, start_line, dead_line, job_description } =
      req.body;

    if (!title || !position || !start_line || !dead_line || !job_description) {
      return res.status(400).json({
        success: false,
        message: '모든 필수 항목을 입력해주세요.',
      });
    }

    // 공고 생성
    const newJob = await Jobs.create({
      COMPANIES_ID: payload.id,
      TITLE: title,
      POSITION: position,
      START_LINE: start_line,
      DEAD_LINE: dead_line,
      JOB_DESCRIPTION: job_description,
    });

    return res.status(201).json({
      success: true,
      id: newJob.ID,
      message: '공고가 성공적으로 생성되었습니다.',
    });
  } catch (error) {
    console.error('공고 생성 오류:', error);
    return res.status(500).json({
      success: false,
      message: '공고 생성 중 오류가 발생했습니다.',
    });
  }
};

/**
 * PUT /jobs
 * 공고 수정
 */
const updateJob = async (req, res) => {
  try {
    // req.user는 authMiddleware에서 설정됨
    const companyId = req.user.id;

    // 기업 ID로 공고 조회
    const job = await Jobs.findOne({
      where: { COMPANIES_ID: companyId },
    });

    // 공고가 존재하지 않는 경우
    if (!job) {
      return res.status(404).json({
        success: false,
        message: '공고를 찾을 수 없습니다.',
      });
    }

    // 수정 가능한 필드
    const { title, position, start_line, dead_line, job_description } =
      req.body;

    // 업데이트할 데이터 객체 생성
    const updateData = {};

    if (title !== undefined) updateData.TITLE = title;
    if (position !== undefined) updateData.POSITION = position;
    if (start_line !== undefined) {
      updateData.START_LINE = start_line;
    }
    if (dead_line !== undefined) {
      updateData.DEAD_LINE = dead_line;
    }
    if (job_description !== undefined)
      updateData.JOB_DESCRIPTION = job_description;

    // 업데이트 실행
    await Jobs.update(updateData, {
      where: { COMPANIES_ID: companyId },
    });

    return res.status(200).json({
      success: true,
      message: '공고가 성공적으로 수정되었습니다.',
    });
  } catch (error) {
    console.error('공고 수정 오류:', error);
    return res.status(500).json({
      success: false,
      message: '공고 수정 중 오류가 발생했습니다.',
    });
  }
};

/**
 * DELETE /jobs
 * 공고 삭제
 */
const deleteJob = async (req, res) => {
  try {
    // req.user는 authMiddleware에서 설정됨
    const companyId = req.user.id;

    // 기업 ID로 공고 조회
    const job = await Jobs.findOne({
      where: { COMPANIES_ID: companyId },
    });

    // 공고가 존재하지 않는 경우
    if (!job) {
      return res.status(404).json({
        success: false,
        message: '공고를 찾을 수 없습니다.',
      });
    }

    // 공고 삭제
    await Jobs.destroy({
      where: { COMPANIES_ID: companyId },
    });

    return res.status(200).json({
      success: true,
      message: '공고가 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    console.error('공고 삭제 오류:', error);
    return res.status(500).json({
      success: false,
      message: '공고 삭제 중 오류가 발생했습니다.',
    });
  }
};

/**
 * GET /jobs/exists
 * 공고 존재 여부 확인
 */
const checkJobExists = async (req, res) => {
  try {
    const companyId = req.user.id;

    // 공고 존재 여부 확인
    const job = await Jobs.findOne({
      where: { COMPANIES_ID: companyId },
    });

    const exists = !!job; // job이 존재하면 true, 없으면 false

    return res.status(200).json({
      exists: exists,
    });
  } catch (error) {
    console.error('공고가 없음:', error);
    return res.status(500).json({
      success: false,
      message: '공고가 없다',
    });
  }
};

/**
 * GET /jobs/info
 * 현재 로그인한 기업의 공고 기본 정보 조회 (title, position, start_line, dead_line, job_description)
 */
const getJobInfo = async (req, res) => {
  try {
    const companyId = req.user.id;

    const job = await Jobs.findOne({
      where: { COMPANIES_ID: companyId },
      attributes: [
        'ID',
        'TITLE',
        'POSITION',
        'START_LINE',
        'DEAD_LINE',
        'JOB_DESCRIPTION',
      ],
    });

    // 공고가 존재하지 않는 경우
    if (!job) {
      return res.status(404).json({
        success: false,
        message: '공고를 찾을 수 없습니다.',
      });
    }

    // 응답 데이터 구성
    const result = {
      id: job.ID,
      title: job.TITLE,
      position: job.POSITION,
      start_line: job.START_LINE,
      dead_line: job.DEAD_LINE,
      job_description: job.JOB_DESCRIPTION,
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error('공고 정보 조회 오류:', error);
    return res.status(500).json({
      success: false,
      message: '공고 정보를 불러오는데 문제가 발생했습니다.',
    });
  }
};

module.exports = {
  getJobs,
  getJobDetail,
  getJobInfo,
  checkJobExists,
  createJob,
  updateJob,
  deleteJob,
};
