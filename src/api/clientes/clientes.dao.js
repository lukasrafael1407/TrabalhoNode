import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

const Cliente = instances.getModel('cliente');
console.log("DAO");

export default class ClientesDAO {

  async findAll(where) {    
    return Cliente.findAll({ where });
  }

  async findByID(id) {
    return getObjectOr404(Cliente,{ where: { id } });
  }

  async create(data) {    
    return Cliente.create(data);
  }

  async update(where, data) {
    const Cliente = await this.findByID(where)

    return await Cliente.update(data);
  }

  async destroy(where) {
    const Cliente = await this.findByID(where);

    return Cliente.destroy();
  }
}
