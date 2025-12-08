const developmentConfig = {
  httpOnly: true,
  secure: false, // 개발은 http라 false
  sameSite: 'Lax', // 개발에서는 None 쓰면 차단됨
  maxAge: 1000 * 60 * 60 * 24,
  domain: 'localhost', // 또는 하지 않아도 됨
};

const productionConfig = {
  httpOnly: true,
  secure: true, // 배포는 HTTPS라 true
  sameSite: 'None', // cross-site 허용하려면 true + None 조합
  maxAge: 1000 * 60 * 60 * 24,
  domain: '.x-ink.store', // 서브도메인 포함
};

// ✔️ 비교 연산자 === 로 환경 분기
const config =
  process.env.NODE_ENV === 'development' ? developmentConfig : productionConfig;

module.exports = config;
