import { PetRepository } from './pet.repository.js';
import { Pet } from './pet.entity.js';
import { ClientRepository } from '../client/client.repository.js';
const repository = new PetRepository();
function sanitizePetInput(req, res, next) {
    req.body.sanitizedInput = {
        client_id: req.body.client_id,
        name: req.body.name,
        age: req.body.age,
        type: req.body.type,
        breed: req.body.breed,
        weight: req.body.weight
    };
    //mas validaciones con una libreria
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    }),
        next();
}
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
} //todas las mascotas
async function findOne(req, res) {
    const id = Number.parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: 'Invalid id parameter' });
    }
    const pet = await repository.findOne({ id: id.toString() });
    if (!pet) {
        return res.status(404).send({ message: 'Pet not found' });
    }
    res.json({ data: pet });
}
//post
async function add(req, res) {
    const input = req.body.sanitizedInput;
    const petInput = new Pet(input.name, input.age, input.type, input.breed, input.weight, input.client_id // Add client_id argument
    );
    try {
        const pet = await repository.add(petInput);
        return res.status(201).send({ message: 'Pet created', data: pet });
    }
    catch (error) {
        return res.status(500).send({ message: 'Failed to create Pet' });
    }
}
//put
async function update(req, res) {
    const pet = await repository.update(req.params.id, req.body.sanitizedInput);
    if (!pet) {
        res.status(404).send({ message: "Pet not found" });
    }
    return res.status(200).send({ message: 'Pet updated successfully', data: pet });
}
//delete
async function remove(req, res) {
    const { id } = req.params;
    const pet = await repository.delete({ id });
    if (!pet) {
        res.status(404).send({ message: "Pet not found" });
    }
    else {
        res.status(200).send({ message: "Pet deleted successfully" });
    }
}
//get by client
async function findByClientId(req, res) {
    const clientId = req.params.clientId;
    const clientRepository = new ClientRepository();
    const client = await clientRepository.findOne({ id: clientId });
    if (!client) {
        return res.status(404).send({ message: 'Client not found' });
    }
    const pets = await repository.findByClientId(clientId);
    if (!pets) {
        return res.status(404).send({ message: 'Pets not found for the given client' });
    }
    res.json({ ownerData: client, petData: pets });
}
async function findByClientDni(req, res) {
    const dni = req.params.dni;
    const clientRepository = new ClientRepository;
    const client = await clientRepository.findClientByDni(dni);
    if (!client) {
        return res.status(404).send({ message: 'Client not found' });
    }
    const clientId = client.id;
    if (!clientId) {
        return res.status(404).send({ message: 'Client ID not found' });
    }
    const pets = await repository.findByClientId(clientId.toString());
    if (!pets) {
        return res.status(404).send({ message: 'Pets not found for the given client' });
    }
    res.json({ ownerData: client, petData: pets });
}
export { sanitizePetInput, findAll, findOne, add, update, remove, findByClientId, findByClientDni };
//# sourceMappingURL=pet.controler.js.map