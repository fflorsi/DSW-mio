import { pool } from "../shared/db/conn.js";
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
export class PetRepository {
    async findAll() {
        const [pets] = await pool.query('select * FROM pets');
        return pets; //esto solo funciona si no tenemos nada dentro de PET que deba ejecutarse
    }
    async findOne(item) {
        const id = Number.parseInt(item.id);
        const [pets] = await pool.query('select * from pets where id = ?', [id]);
        if (pets.length === 0) {
            return undefined;
        }
        const pet = pets[0];
        return pet;
    }
    async update(id, petInput) {
        const petId = Number.parseInt(id);
        const { ...petRow } = petInput;
        await pool.query('update pets set ? where id = ?', [petRow, petId]);
        return petInput;
    }
    async add(petInput) {
        const { id, ...petRow } = petInput;
        const [result] = await pool.query('insert into pets set ?', [petRow]);
        petInput.id = result.insertId;
        return petInput;
    }
    async delete(item) {
        try {
            const petToDelete = await this.findOne(item);
            const petId = Number.parseInt(item.id);
            await pool.query('delete from pets where id = ?', petId);
            //no se puede retornar el elemento eliminado asi que hacemos esto
            return petToDelete;
        }
        catch (error) {
            throw new Error('unable to delete Pet');
        }
    }
    async findByClientId(clientId) {
        const id = Number.parseInt(clientId);
        if (isNaN(id)) {
            return undefined;
        }
        try {
            const [pets] = await pool.query('SELECT * FROM pets WHERE client_id = ?', [id]);
            return pets;
        }
        catch (error) {
            throw new Error('Unable to find pets by client');
        }
    }
}
//# sourceMappingURL=pet.repository.js.map