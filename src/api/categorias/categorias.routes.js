import CategoriasController from './categorias.controllers';
import * as Schemas from './categorias.controllers';

const controller = new CategoriasController();
console.log("Route");

export default [  {
    
    method: 'GET',
    path: '/categorias/lista',
    handler: controller.list,
    config: {            
      tags: ['api', 'categorias']
    }
  },
  {
    method: 'GET',
    path: '/categorias/detalhe/{id}',
    handler: controller.detail,
    config: {
      tags: ['api', 'categorias'],
      validate: Schemas.detail
    }
  },
  {
    method: 'POST',
    path: '/categorias/novo',
    handler: controller.create,
    config: {
      auth: false,
      tags: ['api', 'categorias'],
      validate: Schemas.create
    }
  },
  {
    method: 'PUT',
    path: '/categorias/editar/{id}',
    handler: controller.update,
    config: {
      tags: ['api', 'categorias'],
      validate: Schemas.update
    }
  },
  {
    method: 'DELETE',
    path: '/categorias/excluir/{id}',
    handler: controller.destroy,
    config: {
      tags: ['api', 'categorias'],
      validate: Schemas.detail
    }
  }
];