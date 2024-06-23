import { pool } from '../shared/db/conn.js';
export class ClientRepository {
    async findAll() {
        const [clients] = await pool.query('select * from clients');
        return clients;
    }
    async findOne(item) {
        const id = Number.parseInt(item.id);
        if (isNaN(id)) {
            return undefined; // Opcional: manejar este caso específico en el repositorio
        }
        const [clients] = await pool.query('SELECT * FROM clients WHERE id = ?', [id]);
        if (clients.length === 0) {
            return undefined;
        }
        const client = clients[0];
        return client;
    }
    async add(clientInput) {
        const { id, ...clientRow } = clientInput;
        const [result] = await pool.query('insert into clients set ?', [clientRow]);
        clientInput.id = result.insertId;
        return clientInput;
    }
    async update(id, clientInput) {
        const clientId = Number.parseInt(id);
        const { ...clientRow } = clientInput;
        await pool.query('update clients set ? where id = ?', [clientRow, clientId]);
        return await this.findOne({ id });
    }
    async delete(item) {
        try {
            const clientToDelete = await this.findOne(item);
            const clientId = Number.parseInt(item.id);
            await pool.query('delete from clients where id = ?', clientId);
            return clientToDelete;
        }
        catch (error) {
            throw new Error('unable to delete client');
        }
    }
    async findClientByDni(dni) {
        const [clients] = await pool.query('SELECT * FROM clients WHERE dni = ?', [dni]);
        if (clients.length === 0) {
            return undefined;
        }
        return clients[0];
    }
}
//# sourceMappingURL=client.repository.js.map