import { v2 as cloudinary } from 'cloudinary'

export const uploadImages=async(file)=>{
  if(!file){
    return []
  }
  let arr = [];
  if(Array.isArray(file)){
    for(let i=0;i<file.length;i++){
      await cloudinary.uploader.upload(file[i].tempFilePath, (err, result)=>{
        arr.push(result.url)
      });
    }
  }
  else{
    await cloudinary.uploader.upload(file.tempFilePath, (err, result)=>{
      arr.push(result.url)
    });
  }
  return arr
}