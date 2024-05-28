import { Repository } from "../shared/repository.js";
import { Pet } from "./pet.entity.js";

const pets = [new Pet(
    "Firulais",
    5,
    "doggie",
    "Pastor Aleman",
    31,
    "1-1-1-1-1"
)]

export class PetRepository implements Repository<Pet>{

    public findAll(): Pet[] | undefined
    {
        return pets 
    }

    public findOne(item: { id: string }): Pet | undefined {
        return pets.find((pet) => pet.id === item.id);
    }

        public add(item: Pet): Pet | undefined {
            pets.push(item);
            return item //cuando tenga acceso a bdd va a devolver un item con el id separado
        
        }

        public update(item: Pet): Pet | undefined {
            const petIdx = pets.findIndex((pet) => pet.id === item.id);
            if (petIdx !== -1) {
                pets[petIdx] = {...pets[petIdx],...item};
            }
            return pets[petIdx];
        }

        public delete(item: { id: string }): Pet | undefined {
            const petIdx = pets.findIndex((pet) => pet.id === item.id);
            if (petIdx !== -1) {
            const deletedPets= pets[petIdx]
            pets.splice(petIdx, 1);  
            return deletedPets;
            }
        }

    }

    
