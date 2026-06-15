import { Client } from "minio";

export const minioClient = new Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESSKEY || "admin",
  secretKey: process.env.MINIO_SECRETKEY || "admin123",
});


const verifBucket = async () => {
  const bucketName = process.env.BUCKET_NAME || "goguia"
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) await minioClient.makeBucket(bucketName, "us-east-1");
}

verifBucket()
