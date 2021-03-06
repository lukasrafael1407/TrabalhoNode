import ProdutosDAO from './produtos.dao';

const produtosDAO = new ProdutosDAO();

export default class ProdutosBusiness {

  async list({ params }) {
    return produtosDAO.findAll(params);
  }

  async detail({ params }) {
    const { id } = params;

    return produtosDAO.findByID(id);
  }

  async create({ payload, auth }) {
    const { id: userId } = auth.credentials;

    return produtosDAO.create({ ...payload, userId });
  }

  async update({ params, payload }) {
    const { id } = params;

    return produtosDAO.update(id, payload);
  }

  async destroy({ params }) {
    const { id } = params;

    return produtosDAO.destroy(id);
  }

  async pesqdesc(descricao) {
    
    return produtosDAO.findByDesc(descricao);
  }

  async pesqcateg({ params }) {
    const { CategoriaId } = params;
    return produtosDAO.findByCateg(CategoriaId);
  }

  async pesqcateg2(CategoriaId) {
    return produtosDAO.findByCateg(CategoriaId);
  }  
}
