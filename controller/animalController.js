import Animal from '../model/animalModel.js'
import {uploadImages} from "../utils/GeneralFunctions.js";

export const getAllAnimals = async (req, res, next) => {
  const animals = await Animal.find();
  if (animals.length === 0) {
    return res.json({
      message: "No animals found"
    })
  }
  return res.json({
    message: animals
  })
}

export const createAnimal = async (req, res, next) => {
  try {
    const file = req.files?.file || null;
    const fileArr = await uploadImages(file);
    const {animalDetails, animalName, totalFee, ticketDetails} = req.body;
    const animal = await Animal.create({
      images: fileArr,
      animalDetails,
      animalName,
      totalFee,
      ticketDetails
    })
    return res.status(201).json({
      message : animal
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message : error
    })
  }
}

export const updateAnimal = async (req, res, next) => {
  try {
    const animalId = req.params.id
    const file = req.files?.file || null;
    const fileArr = await uploadImages(file);
    const {animalDetails, animalName, totalFee, ticketDetails} = req.body;

    const existingAnimal = await Animal.findById(animalId);
    const combinedImages = [...existingAnimal.images, ...fileArr];
    const animal = await Animal.findByIdAndUpdate(animalId, {
      images: combinedImages,
      animalDetails,
      animalName,
      totalFee,
      ticketDetails
    }, {new : true})
    return res.redirect('/animals')
  } catch (error) {
    return res.status(500).json({
      message : error
    })
  }
}

export const removeImages = async(req, res, next) =>{
  const animalId = req.params.id;
  const index = req.query.index;
  const animal = await Animal.findById({
    _id: animalId
  });
  console.log(animal.images[index])
}
