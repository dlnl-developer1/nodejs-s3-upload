const { S3 } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// AWS 자격증명은 환경 변수에서 불러옴
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

// 파일 경로 및 버킷 정보
const filePath = "<local-file-path>";
const folderName = "<folder-name>"; // tts, img 등
const contentType = "<content-mime-type>"; // audio/mp3, image/png 등
const bucketName = process.env.S3_BUCKET_NAME;
const objectKey = `${folderName}/${path.basename(filePath)}`; // 파일 이름

// 파일 업로드 함수
async function uploadFileToS3() {
  try {
    const fileContent = fs.readFileSync(filePath); // 파일 읽기

    const params = {
      Bucket: bucketName, // S3 버킷 이름
      Key: objectKey, // S3에 저장될 파일 이름
      Body: fileContent, // 파일 데이터
      ContentType: contentType, // MIME 타입 설정
    };

    const data = await s3.putObject(params);
    console.log("File uploaded successfully:", data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

uploadFileToS3();
