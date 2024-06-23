//mascota tiene q tener nombre, edad, raza, sexo, peso
import crypto from 'node:crypto';
export class Pet {
    constructor(name, age, type, breed, weight, id = crypto.randomUUID()) {
        this.name = name;
        this.age = age;
        this.type = type;
        this.breed = breed;
        this.weight = weight;
        this.id = id;
    }
}
//# sourceMappingURL=pet.js.map