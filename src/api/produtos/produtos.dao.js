import { instances } from 'hapi-sequelizejs'
import { getObjectOr404 } from '../utils/database.utils';

import { Sequelize } from 'sequelize';

import Boom from '@hapi/boom';

const Op = Sequelize.Op;

const Produto = instances.getModel('produto');

export default class ProdutosDAO {

  async findAll(params) {
    
    return Produto.findAll({
      where: params,
      include: [ 'categoria' ]
    });
  }

  async findByID(id) {
    return getObjectOr404(Produto, {
      where: { id },
      include: [ 'categoria' ]
    });
  }



  async create(data) {
    return Produto.create(data);
  }

  async update(id, data) {
    const post = await this.findByID(id);

    return post.update(data);
  }

  async destroy(id) {
    const post = await this.findByID(id);

    return post.destroy();
  }

  async findByDesc(nome) {
    const pesquisa = '%' + nome + '%';

    return Produto.findAll({
      where: { descricao: { [Op.like]: pesquisa}},
      include: [ 'categoria' ]
    });

  }

  async findByCateg(nome) {
      return Produto.findAll({
        where: { categoriaId: nome },
        include: [ 'categoria' ]
      });

  }

  async atualizaEstoque(id) {  
    
    const produto2 = await Produto.findOne({where: { id }});
    
    if (produto2.quantidade > 0){

        produto2.quantidade = produto2.quantidade - 1;

        return this.update(id, produto2.dataValues);
    } else {
      throw Boom.badRequest("Produto não encontrado no estoque. Quantidade = ZERO!");
    }
  }

}
