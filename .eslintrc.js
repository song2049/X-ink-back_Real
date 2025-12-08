module.exports = {
    // React 버전 자동 감지
    settings: {
        react: {
            version: 'detect',
        },
    },

    // 코드가 실행될 환경 설정
    env: {
        browser: true, // 브라우저 환경 (window, document 등 사용 가능)
        es2021: true,
    },

    // 파서 옵션 설정
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module', // ES6 모듈 사용
        ecmaFeatures: {
            jsx: true, // JSX 구문 지원
        },
    },

    // 사용할 기본 규칙 세트 확장
    extends: [
        'eslint:recommended', // ESLint 기본 추천 규칙
        'plugin:react/recommended', // React 관련 규칙
    ],

    // 사용할 플러그인 (추가 규칙 제공)
    plugins: ['react'],

    // 개별 규칙을 커스터마이징
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off', // PropTypes 사용 안 할 경우 끄기
    },
};


