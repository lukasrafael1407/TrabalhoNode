import CategoriasController from './categorias.controllers';
import * as Schemas from './categorias.schemas';

const controller = new CategoriasController();

export default [  {
    
    method: 'GET',
    path: '/categorias',
    handler: controller.list,
    config: {            
      tags: ['api', 'categorias']
    }
  },
  {
    method: 'GET',
    path: '/categorias/{id}',
    handler: controller.detail,
    config: {
      validate: Schemas.detail,
      tags: ['api', 'categorias']
    }
  },
  {
    method: 'POST',
    path: '/categorias',
    handler: controller.create,
    config: {
      tags: ['api', 'categorias'],
      validate: Schemas.create
    }
  },
  {
    method: 'PUT',
    path: '/categorias/{id}',
    handler: controller.update,
    config: {
      tags: ['api', 'categorias'],
      validate: Schemas.update
    }
  },
  {
    method: 'DELETE',
    path: '/categorias/{id}',
    handler: controller.destroy,
    config: {
      tags: ['api', 'categorias'],
      validate: Schemas.detail
    }
  }
  
];