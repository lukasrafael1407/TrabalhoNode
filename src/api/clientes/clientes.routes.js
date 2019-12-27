import ClientesController from './clientes.controllers';
import * as Schemas from './clientes.schemas';

const controller = new ClientesController();
console.log("Route");

export default [  {
    
    method: 'GET',
    path: '/clientes/lista',
    handler: controller.list,
    config: {            
      tags: ['api', 'clientes']
    }
  },
  {
    method: 'GET',
    path: '/clientes/detalhe/{id}',
    handler: controller.detail,
    config: {
      tags: ['api', 'clientes'],
      validate: Schemas.detail
    }
  },
  {
    method: 'POST',
    path: '/clientes/novo',
    handler: controller.create,
    config: {
      auth: false,
      tags: ['api', 'clientes'],
      validate: Schemas.create
    }
  },
  {
    method: 'POST',
    path: '/clientes/login',
    handler: controller.login,
    config: {
      auth: false,
      tags: ['api', 'clientes'],
      validate: Schemas.create
    }
  },
  {
    method: 'PUT',
    path: '/clientes/editar/{id}',
    handler: controller.update,
    config: {
      tags: ['api', 'clientes'],
      validate: Schemas.update
    }
  },
  {
    method: 'DELETE',
    path: '/clientes/excluir/{id}',
    handler: controller.destroy,
    config: {
      tags: ['api', 'clientes'],
      validate: Schemas.detail
    }
  }
];
