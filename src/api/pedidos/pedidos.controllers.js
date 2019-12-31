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

    // Percorre a lista de produtos
    payload.produtos.forEach((item) => {

    // Verifica se o produto existe, se não existir retorna status 400.
    const produto = produtosDAO.findByID(item.id);
    if (!produto) {
      return res.status(400);
    }

    // Seta o ID do pedido para gravar na tabela auxiliar
    const po = {
      pedidoId: pedidoGravado.id,
      produtoId: item.id,
    }

    // Grava a pedidoProduto
    const pedidoProdutoGravado = pedidosDAO.createPedidoProduto(po, { w: 1 }, { returning: true });
    });

    // Se tudo der certo retorna 200
    return h.response(pedidoGravado).code(CREATED);
  }

  // async update({ params, payload }, h) {
  //   return await pedidosDAO.update(params, payload);
  // }

  async update({ params, payload }, h) {
    const { id } = params;
    const { clienteId } = params;
//    const pedido = await pedidosDAO.findByID(id);

  // Remove all current associations
  const retorno = pedidosDAO.deletePedidoProduto(id);

  // Loop through all the items in the request
  payload.produtos.forEach((item) => {
  // We will use this dictionary to create a ProductOrder 
    const po = {
      pedidoId: id,
      produtoId: item.id
    };

    // Create and save the ProductOrder
    const pedidoProdutoGravado = pedidosDAO.createPedidoProduto(po, { w: 1 }, { returning: true });
  });
                                  
  // Update the location Property
  const pedidoAlterado = await pedidosDAO.update(id, {...payload, clienteId}); 

  // If everything goes well respond with the updatedOrder
  // You may also include other properties like we did in the get request
  return respondWith(res, 200, ['Updated order'], { updatedOrder });
}

  async destroy({ params }, h) {
    await pedidosDAO.destroy(params);

    return h.response().code(NO_CONTENT);
  }
}
