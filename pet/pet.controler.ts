import { Request, Response, NextFunction } from 'express';
import { PetRepository } from './pet.repository.js';
import { Pet } from './pet.entity.js';

const repository = new PetRepository(); 

function sanitizePetInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = { //solo las prop no nulas
      name: req.body.name,
      age: req.body.age,
      type: req.body.type,
      breed: req.body.breed,
      weight: req.body.weight
    }
    //mas validaciones con una libreria
    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key];}
    }),
        
  
    next();
  }

function findAll(req:Request, res:Response) {
    res.json({data: repository.findAll()});
} //todas las mascotas

function findOne(req:Request, res:Response) {
    const id = req.params.id
    const pet = repository.findOne({id});
    if (!pet) {
        return res.status(404).send({message: "Pet not found"});
    }
    res.json({data: pet});
} //una mascota por id



//post
function add(req:Request, res:Response) {
    const input = req.body.sanitizedInput;
    const petInput = new Pet(input.name, 
      input.age, 
      input.type, 
      input.breed, 
      input.weight
    );
    const pet = repository.add(petInput)
    return res.status(201).send({message: "Pet created", data: pet});
          //201 indica que se creo el recurso
  
  }
  
  //put
function Update(req:Request, res:Response) {
    req.body.sanitizedInput.id = req.params.id;
    const pet= repository.update(req.body.sanitizedInput);
    if (!pet) {
      return res.status(404).send({message: "Pet not found"});
    }
  
    return res.status(200).send({message: "Pet updated", data: pet});
  }
  
  
  //delete
  function remove(req:Request, res:Response) {
    const id = req.params.id;
    const pet = repository.delete({id});
    if (!pet) {
      res.status(404).send({message: "Pet not found"});
    }else{
    res.status(200).send({message: "Pet deleted"});
    }
  }
  

export { sanitizePetInput, findAll, findOne, add, Update, remove}