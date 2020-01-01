import PostsController from './produtos.controller';
import * as Schemas from './produtos.schemas';

const controller = new PostsController();

export default [
  {
    method: 'GET',
    path: '/produtos',
    handler: controller.list,
    config: {
      tags: ['api', 'produtos']
    }
  },
  {
    method: 'GET',
    path: '/produtos/{id}',
    handler: controller.detail,
    config: {
      validate: Schemas.detail,
      tags: ['api', 'produtos']
    }
  },
  {
    method: 'POST',
    path: '/produtos',
    handler: controller.create,
    config: {
      validate: Schemas.create,
      tags: ['api', 'produtos']
    }
  },
  {
    method: 'PUT',
    path: '/produtos/{id}',
    handler: controller.update,
    config: {
      validate: Schemas.update,
      tags: ['api', 'produtos']
    }
  },
  {
    method: 'DELETE',
    path: '/produtos/{id}',
    handler: controller.destroy,
    config: {
      validate: Schemas.detail,
      tags: ['api', 'produtos']
    }
  },
  {
    method: 'GET',
    path: '/produtos/descricao',
    handler: controller.pesqdesc,
    config: {
      validate: Schemas.pesquisa,
      tags: ['api', 'produtos']
    }
  },
  {
    method: 'GET',
    path: '/produtos/categoria/{CategoriaId}',
    handler: controller.pesqcateg,
    config: {
      
      tags: ['api', 'produtos']
    }
  },
  {
    method: 'GET',
    path: '/produtos/categoria',
    handler: controller.pesqcateg2,
    config: {
      validate: Schemas.pesqcateg,
      tags: ['api', 'produtos']
    }
  }
];
