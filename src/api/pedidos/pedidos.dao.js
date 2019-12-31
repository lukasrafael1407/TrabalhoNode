import { instances } from 'hapi-sequelizejs'
import { getObjectOr404 } from '../utils/database.utils';

const Produto = instances.getModel('produto');
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
      where,
      include: [{
        model: Produto,
        as: 'produtos',
        required: false,
        attributes: ['id', 'descricao', 'quantidade', 'valor'],
        through: {
          // This block of code allows you to retrieve the properties of the join table
          model: PedidoProduto,
          as: 'pedidoProdutos',
        }
      }]
    });
  }

  async findByID(where) {
    return getObjectOr404(Pedido, {
      where,
      include: [{
        model: Produto,
        as: 'produtos',
        required: false,
        attributes: ['id', 'descricao', 'quantidade', 'valor'],
        through: {
          // This block of code allows you to retrieve the properties of the join table
          model: PedidoProduto,
          as: 'pedidoProdutos',
        }
      }]
    });
  }

  async create(data) {
    return Pedido.create(data);
  }

  async createPedidoProduto(data) {
    return PedidoProduto.create(data);
  }

  async deletePedidoProduto(id) {
    return PedidoProduto.destroy({ where: { pedidoId: id } });
  }

  async update(where, data) {
    const Pedido = await this.findByID(where)

    return await Pedido.update(data);
  }

  async destroy(id) {
    const pedido = await this.findByID(id);

    return pedido.destroy();
  }
}
