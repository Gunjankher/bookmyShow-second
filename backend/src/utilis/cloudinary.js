import {v2 as cloudinary} from 'cloudinary'
  import fs from 'fs'
  import path from 'path'
  import dotenv from 'dotenv'


  dotenv.config()

          
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET
  });

console.log(`cloud name`, process.env.CLOUDINARY_CLOUD_NAME);
console.log(`key`, process.env.CLOUDINARY_API_KEY);
console.log(`secret`, process.env.CLOUDINARY_API_SECRET);

  

  const uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) return null;

      console.log("Does file exist?", fs.existsSync(localFilePath));
const stats = fs.statSync(localFilePath);
console.log("File size:", stats.size);

  
      const normalizedPath = path.resolve(localFilePath);
  
      const response = await cloudinary.uploader.upload(normalizedPath, {
        resource_type: "auto",
      });
  
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
  
      return response;
    } catch (error) {
      console.error("Cloudinary upload error:", error.message);
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
      return null;
    }
  };
  


  const deleteOnCloudinary = async (public_id, resource_type="image") => {
    try {
        if (!public_id) return null;

        //delete file from cloudinary
        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: `${resource_type}`
        });
    } catch (error) {
        return error;
        console.log("delete on cloudinary failed", error);
    }
};


  export {uploadOnCloudinary,deleteOnCloudinary}