import { v2 as cloudinary } from 'cloudinary'
import Jwt from 'jsonwebtoken';
const {verify} = Jwt;

export const uploadImages=async(file)=>{
  console.log(file)
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

export const getUserFromToken=(token)=>{
  return verify(token, process.env.JWT_SECRET)
}

export function formatDate(inputDate) {
  if (!(inputDate instanceof Date)) {
    inputDate = new Date(inputDate);
  }
  if (isNaN(inputDate.getTime())) {
    return "Invalid Date";
  }
  const day = String(inputDate.getDate()).padStart(2, "0");
  const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = inputDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}