import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

const Categoria = instances.getModel('categoria');

export default class CategoriaDAO {

  async findAll(where) {
    return Categoria.findAll({ where });
  }

  async findByID(id) {
    return getObjectOr404(Categoria,{ where: { id } });
  }

  async create(data) {
    return Categoria.create(data);
  }

  async update(where, data) {
    const Categoria = await this.findByID(where)

    return await Categoria.update(data);
  }

  async destroy(where) {
    const Categoria = await this.findByID(where);

    return Categoria.destroy();
  }
}