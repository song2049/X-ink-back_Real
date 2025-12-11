const multer = require('multer');

// Multer 설정 - 메모리 스토리지 사용 (파일을 메모리에 저장)
const storage = multer.memoryStorage();

// 파일 필터링 (이미지 파일만 허용)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error('이미지 파일만 업로드 가능합니다. (jpg, jpeg, png, gif, webp)'),
      false,
    );
  }
};

// Multer 미들웨어 설정
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB 제한
  },
});

const uploadSingle = upload.single('file');

module.exports = uploadSingle;
