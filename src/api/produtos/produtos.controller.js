import { CREATED, NO_CONTENT } from 'http-status';

import ProdutosBusiness from './produtos.business';

const produtosBusiness = new ProdutosBusiness();

export default class ProdutosController {

  async list(request, h) {
    return await produtosBusiness.list(request);
  }

  async detail(request, h) {
    return await produtosBusiness.detail(request);
  }

  async create(request, h) {
    const post = await produtosBusiness.create(request);

    return h.response(post).code(CREATED);
  }

  async update(request, h) {
    return await produtosBusiness.update(request);
  }

  async destroy(request, h) {
    await produtosBusiness.destroy(request);

    return h.response().code(NO_CONTENT);
  }

  async pesqdesc(request, h) {
    const { descricao } = request.query;
    return await produtosBusiness.pesqdesc(descricao);
  }

  async pesqcateg(request, h) {
      
    return await produtosBusiness.pesqcateg(request);
  }

  async pesqcateg2(request, h) {
    const { categoriaId } = request.query;
    return await produtosBusiness.pesqcateg2(categoriaId);
  }

}