import { CREATED, NO_CONTENT } from 'http-status';

import PedidosBusiness from './pedidos.business';

const pedidosBusiness = new PedidosBusiness();

export default class PedidosController {

  async list({ params }, h) {
    return await pedidosBusiness.list(params);
  }

  async detail({ params }, h) {
    return await pedidosBusiness.detail(params);
  }

  async create(request, h) {
    const pedido = await pedidosBusiness.create(request);

    return h.response(pedido).code(CREATED);
  }

  async update(request, h) {
    return await pedidosBusiness.update(request);
  }

  async destroy(request, h) {
    await pedidosBusiness.destroy(request);

    return h.response().code(NO_CONTENT);
  }
}
