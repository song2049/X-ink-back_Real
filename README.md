# X-Link 백엔드 API

구인구직 서비스 V1 백엔드 API 서버입니다.

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 아래 내용을 추가하세요:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=x_link_db
DB_USER=root
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 3. MySQL 데이터베이스 준비

```sql
-- 데이터베이스 생성
CREATE DATABASE x_link_db;

-- user 테이블 생성
USE x_link_db;
CREATE TABLE user (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 테스트 사용자 생성 (비밀번호는 bcrypt로 해시됨)
-- 예시: email: test@example.com, password: password123
-- bcrypt로 해시된 비밀번호를 직접 삽입해야 합니다
```

### 4. 서버 실행

```bash
# 개발 모드 (nodemon)
npm run dev

# 프로덕션 모드
npm start
```

## 📡 API 엔드포인트

### POST /auth/login

사용자 로그인 API

**요청 예시:**

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**성공 응답 (200):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1
}
```

**실패 응답:**

- **404** - 이메일이 존재하지 않음

```json
{
  "success": false,
  "message": "존재하지 않는 이메일입니다."
}
```

- **400** - 비밀번호 불일치

```json
{
  "success": false,
  "message": "비밀번호가 일치하지 않습니다."
}
```

- **400** - 필수 값 누락

```json
{
  "success": false,
  "message": "이메일과 비밀번호를 입력해주세요."
}
```

## 🔐 비밀번호 해시 생성

테스트용 사용자를 생성하려면 bcrypt로 비밀번호를 해시해야 합니다:

```javascript
const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = 'password123';
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
}

hashPassword();
```

생성된 해시를 MySQL의 user 테이블에 삽입하세요.

## 🛠️ 기술 스택

- **Node.js** + **Express** - 백엔드 프레임워크
- **MySQL** + **mysql2/promise** - 데이터베이스 (커넥션 풀 사용)
- **bcrypt** - 비밀번호 해싱
- **jsonwebtoken** - JWT 토큰 생성
- **dotenv** - 환경 변수 관리
