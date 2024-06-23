import { Repository } from "../shared/repository.js";
import { Pet } from "./pet.entity.js";
import { pool } from "../shared/db/conn.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";


/*const pets = [new Pet(
    "Firulais",
    5,
    "doggie",
    "Pastor Aleman",
    31,
    "1-1-1-1-1"
)]*/

/*export class PetRepository implements Repository<Pet>{

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

    }*/

export class PetRepository implements Repository<Pet>{
    public async findAll(): Promise<Pet[] | undefined> {
        const [pets] = await pool.query('select * FROM pets')
        return pets as Pet[] //esto solo funciona si no tenemos nada dentro de PET que deba ejecutarse
    }

    public async findOne(item:{id:string}): Promise <Pet | undefined>{
        const id = Number.parseInt(item.id)
        const [pets] = await pool.query<RowDataPacket[]>('select * from pets where id = ?', [id])
        if (pets.length === 0){
            return undefined
        }
        const pet = pets[0] as Pet
        return pet
        
    }

    public async update(id:string, petInput:Pet): Promise<Pet | undefined>{
        const petId = Number.parseInt(id)
        const {...petRow} = petInput
        await pool.query('update pets set ? where id = ?', [petRow, petId])
        return petInput
    }
   
    public async add(petInput:Pet): Promise <Pet | undefined>{
        const{id, ...petRow} = petInput
        const [result] = await pool.query<ResultSetHeader>('insert into pets set ?', [petRow])
        petInput.id=result.insertId
        return petInput
    }
   
    public async delete(item:{id:string}): Promise <Pet | undefined>{
        
        try{
            const petToDelete = await this.findOne(item)
            const petId = Number.parseInt(item.id)
            await pool.query('delete from pets where id = ?',petId)
            //no se puede retornar el elemento eliminado asi que hacemos esto
            return petToDelete
        }catch(error: any){
            throw new Error('unable to delete Pet')
        }
    }

    public async findByClientId(clientId: string): Promise<Pet[] | undefined> {
        const id = Number.parseInt(clientId);
        if (isNaN(id)) {
            return undefined;
        }
        try{
            const [pets] = await pool.query<RowDataPacket[]>('SELECT * FROM pets WHERE client_id = ?', [id]);
            return pets as Pet[]
        }catch(error: any){
            throw new Error('Unable to find pets by client')
        }   
    }

}

    
