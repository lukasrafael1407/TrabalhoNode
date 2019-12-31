import { CREATED, NO_CONTENT } from 'http-status';
import PedidosDAO from './pedidos.dao'
import ProdutosDAO from '../produtos/produtos.dao';

//import PedidosBusiness from './pedidos.business';

const pedidosDAO = new PedidosDAO();
const produtosDAO = new ProdutosDAO();

export default class PedidosController {

  async list({ params }, h) {
    return await pedidosDAO.findAll(params);
  }

  async detail({ params }, h) {
    return await pedidosDAO.findByID(params);
  }

  // async create({ params, payload }, h) {
  //   const { produtoId } = params;
  //   const pedido = await pedidosDAO.create({ ...payload, produtoId })

  //   return h.response(pedido).code(CREATED);
  // }

  async create({ params, payload }, h) {

    const { clienteId } = params;
    const pedidoGravado = await pedidosDAO.create({...payload, clienteId}, {w: 1}, { returning: true });

  // Loop through all the items in req.products
    payload.produtos.forEach((item) => {

    // Search for the product with the givenId and make sure it exists. If it doesn't, respond with status 400.
    const produto = produtosDAO.findByID(item.id);
    if (!produto) {
      return res.status(400);
    }

    // Create a dictionary with which to create the ProductOrder
    const po = {
      pedidoId: pedidoGravado.id,
      produtoId: item.id,
    }

    // Create and save a productOrder
    const pedidoProdutoGravado = pedidosDAO.createPedidoProduto(po, { w: 1 }, { returning: true });
    });

    // If everything goes well, respond with the order
    return h.response(pedidoGravado).code(CREATED);
  }

  async update({ params, payload }, h) {
    return await pedidosDAO.update(params, payload);
  }

  async destroy({ params }, h) {
    await pedidosDAO.destroy(params);

    return h.response().code(NO_CONTENT);
  }
}
