import { CREATED, NO_CONTENT } from 'http-status';
import PedidosDAO from './pedidos.dao'

//import PedidosBusiness from './pedidos.business';

const pedidosDAO = new PedidosDAO();

export default class PedidosController {

  async list({ params }, h) {
    return await pedidosDAO.findAll(params);
  }

  async detail({ params }, h) {
    return await pedidosDAO.findByID(params);
  }

  async create({ params, payload }, h) {
    const { produtoId } = params;
    const pedido = await pedidosDAO.create({ ...payload, produtoId })

    return h.response(pedido).code(CREATED);
  }

  async update({ params, payload }, h) {
    return await pedidosDAO.update(params, payload);
  }

  async destroy({ params }, h) {
    await pedidosDAO.destroy(params);

    return h.response().code(NO_CONTENT);
  }
}
