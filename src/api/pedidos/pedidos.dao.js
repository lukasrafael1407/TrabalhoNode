import { instances } from 'hapi-sequelizejs'
import { getObjectOr404 } from '../utils/database.utils';

const Pedido = instances.getModel('pedido');
const PedidoProduto = instances.getModel('pedidoproduto');

export default class PedidosDAO {

  // async findAll(params) {
  //   return Pedido.findAll({
  //     where: params,
  //     include: [ 'produtos' ]
  //   });
  // }

  async findAll(where) {
    return Pedido.findAll({
      where
    });
  }

  async findByID(where) {
    return getObjectOr404(Pedido, {
      where
    });
  }

  async create(data) {
    return Pedido.create(data);
  }

  async createPedidoProduto(data) {
    return PedidoProduto.create(data);
  }

  async update(id, data) {
    const pedido = await this.findByID(id);

    return pedido.update(data);
  }

  async destroy(id) {
    const pedido = await this.findByID(id);

    return pedido.destroy();
  }
}
