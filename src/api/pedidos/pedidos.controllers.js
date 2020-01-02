import { CREATED, NO_CONTENT, OK, BAD_REQUEST } from 'http-status';
import PedidosDAO from './pedidos.dao'
import ProdutosDAO from '../produtos/produtos.dao';
import Boom from '@hapi/boom';

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
    let valor = 0;
    // Percorre a lista de produtos
    payload.produtos.forEach(async (item, idx, array) => {

    // Verifica se o produto existe, se não existir retorna status 400.
    const produto = await produtosDAO.findByID(item.id);
    if (!produto) {
      //return res.status(400);
      throw Boom.badRequest("Produto não existe: " + item.id);
    } else if (produto.quantidade <= 0) {
      throw Boom.badRequest("Saldo insuficiente para o produto: " + item.id + " - " + produto.descricao);
    } else {
      valor = valor + produto.valor;
      await produtosDAO.atualizaEstoque(item.id);
    }

    // Seta o ID do pedido para gravar na tabela auxiliar
    const po = {
      pedidoId: pedidoGravado.id,
      produtoId: item.id,
    }

    // Grava a pedidoProduto
    const pedidoProdutoGravado = await pedidosDAO.createPedidoProduto(po, { w: 1 }, { returning: true });
    
    // No ultimo produto atualiza a soma do valor
    if (idx === array.length - 1){ 
      payload.valor = valor;
      params.id = pedidoGravado.id;
      const pedidoAlterado = await pedidosDAO.update(params, payload);
    }

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
    let valor = 0;
    let pedidoAlterado;
    // Deleta as associações
    const retorno = pedidosDAO.deletePedidoProduto(id);

    //const pedidoAlterado = await pedidosDAO.update(params, payload) 

    payload.produtos.forEach(async (item, idx, array) => {

      // Verifica se o produto existe, se não existir retorna status 400.
      const produto = await produtosDAO.findByID(item.id);
      if (!produto) {
        throw Boom.badRequest("Produto não existe: " + item.id);
      } else if (produto.quantidade <= 0) {
        throw Boom.badRequest("Saldo insuficiente para o produto: " + item.id + " - " + produto.descricao);
      } else {
        valor = valor + produto.valor;
        await produtosDAO.atualizaEstoque(item.id);
      }

      // Seta o ID do pedido para gravar na tabela auxiliar
      const po = {
        pedidoId: id,
        produtoId: item.id,
      }

      // Grava a pedidoProduto
      const pedidoProdutoGravado = await pedidosDAO.createPedidoProduto(po, { w: 1 }, { returning: true });
      if (idx === array.length - 1){ 
        payload.valor = valor;
        pedidoAlterado = await pedidosDAO.update(params, payload) 
      }
    });
    return await h.response(pedidoAlterado).code(OK);
  }

  async destroy({ params }, h) {
    await pedidosDAO.destroy(params);

    return h.response().code(NO_CONTENT);
  }
}
