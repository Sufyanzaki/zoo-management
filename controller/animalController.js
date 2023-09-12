import { v2 as cloudinary } from 'cloudinary'
export const uploadImages = async (req, res, next) => {
  let arr = [];
    const file = req.files.file;
    console.log(file)
    await cloudinary.uploader.upload(file.tempFilePath, (err, result)=>{
      arr.push(result.url)
    });
    res.status(201).json({
      message : arr
    })
  };
  