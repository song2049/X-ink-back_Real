const s3 = require('../config/aws');
const { v4: uuidv4 } = require('uuid');
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

/**
 * POST /api/upload
 * 파일을 S3에 업로드
 */
const uploadFile = async (req, res) => {
  try {
    // 파일이 없으면 에러
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: '파일이 업로드되지 않았습니다.',
      });
    }

    const file = req.file;
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `uploads/${fileName}`, // 아마존 S3 내 버킷에 있는 경로설정임 지금은 업로드란 폴더에 해당 파일을 저장하겠단거
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // 얘가 사실상 upload를 해주는 것 params 규칙대로 업로드가 진행됨
    const uploadResult = await s3.upload(params).promise();

    console.log(uploadResult.Location);

    return res.status(200).json({
      success: true,
      message: '파일이 성공적으로 업로드되었습니다.',
    });
  } catch (error) {
    console.error('파일 업로드 오류:', error);
    return res.status(500).json({
      success: false,
      message: '파일 업로드 중 오류가 발생했습니다.',
      error: error.message,
    });
  }
};

module.exports = {
  upload,
  uploadFile,
};
