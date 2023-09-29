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
  try {
    const animal = await Animal.findById(animalId);
    if (index >= 0 && index < animal.images.length) {
      animal.images.splice(index, 1);
      await animal.save();
      res.status(200).send('Success');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const deleteAnimal = async (req, res, next) => {
  const animalId = req.params.id;
  
  try {
    await Animal.findByIdAndDelete(animalId);
    res.send('Success')
  } catch (error) {
    res.render('error', {
      errors: {
        message: 'This Animal does not exist',
        title: 'Animal not found'
      }
    })
  }
}