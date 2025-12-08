const bcrypt = require('bcrypt');
const { User, Companies } = require('../models');

/**
 * POST /join/companies
 * 기업 회원가입
 */
const companiesJoin = async (req, res) => {
  const { EMAIL, PASSWORD, NAME, ADDRESS, PHONE, BUSINESS_NUMBER } = req.body;

  try {
    // 필수 값 검증
    if (
      !EMAIL ||
      !PASSWORD ||
      !NAME ||
      !ADDRESS ||
      !PHONE ||
      !BUSINESS_NUMBER
    ) {
      return res.status(400).json({
        success: false,
        message: '모든 필수 항목을 입력해주세요.',
      });
    }

    // 이메일 중복 확인 (Companies 테이블)
    const existingCompany = await Companies.findOne({
      where: { EMAIL },
    });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: '이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.',
      });
    }

    // 이메일 중복 확인 (User 테이블)
    const existingUser = await User.findOne({
      where: { EMAIL },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.',
      });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    // 기업 계정 생성
    await Companies.create({
      EMAIL,
      PASSWORD: hashedPassword,
      NAME,
      ADDRESS,
      PHONE,
      BUSINESS_NUMBER,
    });

    return res.status(201).json({
      success: true,
      message: '기업 회원가입이 완료되었습니다.',
    });
  } catch (error) {
    console.error('기업 회원가입 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
    });
  }
};

/**
 * POST /join/volunteer
 * 일반 유저 회원가입
 */
const volunteerJoin = async (req, res) => {
  const { EMAIL, NAME, PASSWORD, PHONE_NUMBER, BIRTH_DATE } = req.body;

  try {
    // 필수 값 검증
    if (!EMAIL || !NAME || !PASSWORD || !PHONE_NUMBER || !BIRTH_DATE) {
      return res.status(400).json({
        success: false,
        message: '모든 필수 항목을 입력해주세요.',
      });
    }

    // 이메일 중복 확인 (User 테이블)
    const existingUser = await User.findOne({
      where: { EMAIL },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.',
      });
    }

    // 이메일 중복 확인 (Companies 테이블)
    const existingCompany = await Companies.findOne({
      where: { EMAIL },
    });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: '이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.',
      });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    // 유저 계정 생성
    await User.create({
      EMAIL,
      PASSWORD: hashedPassword,
      NAME,
      PHONE_NUMBER,
      BIRTH_DATE,
    });

    return res.status(201).json({
      success: true,
      message: '유저 회원가입이 완료되었습니다.',
    });
  } catch (error) {
    console.error('유저 회원가입 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
    });
  }
};

module.exports = {
  companiesJoin,
  volunteerJoin,
};
