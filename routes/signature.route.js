// import AWS from "aws-sdk";
// import dotenv from 'dotenv';

// dotenv.config();

// const s3 = new AWS.S3({
//   endpoint: 'https://s3.filebase.com',
//   accessKeyId: process.env.FILEBASE_ACCESS_KEY,
//   secretAccessKey: process.env.FILEBASE_SECRET_KEY,
//   signatureVersion: 'v4',
// });

// const bucketName = "easelearn";

// const uploadPDFToFilebase = async (fileContent, fileName) => {
//   const params = {
//     Bucket: bucketName,
//     Key: fileName, // Name of the file in the bucket
//     Body: fileContent,
//     ContentType: 'application/pdf',
//     ACL: 'public-read', // Make the file publicly accessible
//   };

  

//   try {
//     const data = await s3.upload(params).promise();
//     console.log('File uploaded successfully at', data.Location);
//     return data.Location; // Returns the file URL
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw error;
//   }
// };

// export default uploadPDFToFilebase;

// Example of the backend route// Import necessary libraries
import express from 'express';
import cloudinary from 'cloudinary';
// import {cloudinary} from "../config/cloudinaryConfig.js"
import dotenv from 'dotenv';

// Initialize dotenv to access environment variables
dotenv.config();

const router = express.Router();

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Endpoint to generate a Cloudinary signature for signed uploads
router.post('/generateSignature', (req, res) => {
  const { timestamp, upload_preset } = req.body; // Extract timestamp and upload preset from request body

  if (!timestamp || !upload_preset) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    // Generate the signature
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, upload_preset },
      process.env.CLOUDINARY_API_SECRET
    );

    // Respond with the signature and other details needed for uploading
    res.json({
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
      timestamp,
    });
  } catch (error) {
    console.error("Error generating signature:", error);
    res.status(500).json({ message: 'Server error generating signature' });
  }
});

export default router;
