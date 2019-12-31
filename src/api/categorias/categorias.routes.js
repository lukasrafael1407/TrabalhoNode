import CategoriasController from './categorias.controllers';
import * as Schemas from './categorias.controllers';

const controller = new CategoriasController();
//console.log("Route");

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
      tags: ['api', 'categorias'],
      validate: Schemas.detail
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