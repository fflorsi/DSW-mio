//mascota tiene q tener nombre, edad, raza, sexo, peso
import crypto from 'node:crypto';
export class Pet {
  constructor(
    public name: string,
    public age: number,
    public type: string,
    public breed: string,
    public weight: number,
    public client_id: number,
    public id?: number,
  ) {}
}
