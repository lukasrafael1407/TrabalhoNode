import { CREATED, NO_CONTENT, OK } from 'http-status';
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

    // Se tudo der certo retorna 201
    return h.response(pedidoGravado).code(CREATED);
  }

  // async update({ params, payload }, h) {
  //   return await pedidosDAO.update(params, payload);
  // }

  async update({ params, payload }, h) {
    const { id } = params;
    const { clienteId } = params;

  // Deleta as associações
  const retorno = pedidosDAO.deletePedidoProduto(id);

  const pedidoAlterado = await pedidosDAO.update(params, payload) 

    payload.produtos.forEach((item) => {

      // Verifica se o produto existe, se não existir retorna status 400.
      const produto = produtosDAO.findByID(item.id);
      if (!produto) {
        return res.status(400);
      }

      // Seta o ID do pedido para gravar na tabela auxiliar
      const po = {
        pedidoId: pedidoAlterado.id,
        produtoId: item.id,
      }

      // Grava a pedidoProduto
      const pedidoProdutoGravado = pedidosDAO.createPedidoProduto(po, { w: 1 }, { returning: true });
    });

    return h.response(pedidoAlterado).code(OK);
  }

  async destroy({ params }, h) {
    await pedidosDAO.destroy(params);

    return h.response().code(NO_CONTENT);
  }
}
