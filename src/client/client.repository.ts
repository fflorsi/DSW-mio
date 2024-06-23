import { Repository } from '../shared/repository.js'
import { Client} from './client.entity.js'
import { pool } from '../shared/db/conn.js'
import { ResultSetHeader, RowDataPacket } from 'mysql2'



export class ClientRepository implements Repository<Client> {
  public async findAll(): Promise<Client[] | undefined> {
    const [clients] = await pool.query('select * from clients')
  return clients as Client[]
}

  public async findOne(item: { id: string }): Promise<Client | undefined> {
  const id = Number.parseInt(item.id);
  if (isNaN(id)) {
    return undefined; // Opcional: manejar este caso específico en el repositorio
  }
  const [clients] = await pool.query<RowDataPacket[]>('SELECT * FROM clients WHERE id = ?', [id]);
  if (clients.length === 0) {
    return undefined;
  }
  const client = clients[0] as Client;
  return client;
}


   public async add(clientInput: Client): Promise<Client | undefined> {
    const { id, ...clientRow } = clientInput
    const [result] = await pool.query<ResultSetHeader>('insert into clients set ?', [clientRow])
    clientInput.id = result.insertId
    

    return clientInput
  }

  public async update(id: string, clientInput: Client): Promise<Client | undefined> {
    const clientId = Number.parseInt(id)
    const {  ...clientRow } = clientInput
    await pool.query('update clients set ? where id = ?', [clientRow, clientId])
    return await this.findOne({ id })
  }

public async delete(item: { id: string }): Promise<Client | undefined> {
    try {
      const clientToDelete = await this.findOne(item)
      const clientId = Number.parseInt(item.id)
      await pool.query('delete from clients where id = ?', clientId)
      return clientToDelete
    } catch (error: any) {
      throw new Error('unable to delete client')
    }
  }
  

public async findClientByDni(dni: string): Promise<Client | undefined> {
  const [clients] = await pool.query<RowDataPacket[]>('SELECT * FROM clients WHERE dni = ?', [dni]);
    if (clients.length === 0) {
      return undefined;
    }
  return clients[0] as Client;
  }
  
}