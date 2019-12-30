import PedidosController from './pedidos.controllers';
import * as Schemas from './pedidos.schemas';

const controller = new PedidosController();

export default [
  {
    method: 'GET',
    path: '/pedidos',
    handler: controller.list,
    config: {
      tags: ['api', 'pedidos'],
    }
  },
  {
    method: 'GET',
    path: '/pedidos/{id}',
    handler: controller.detail,
    config: {
      tags: ['api', 'pedidos'],
      validate: Schemas.detail
    }
  },
  {
    method: 'POST',
    path: '/pedidos',
    handler: controller.create,
    config: {
      tags: ['api', 'pedidos'],
      validate: Schemas.create
    }
  },
  {
    method: 'PUT',
    path: '/pedidos/{id}',
    handler: controller.update,
    config: {
      tags: ['api', 'pedidos'],
      validate: Schemas.update
    }
  },
  {
    method: 'DELETE',
    path: '/pedidos/{id}',
    handler: controller.destroy,
    config: {
      tags: ['api', 'pedidos'],
      validate: Schemas.detail
    }
  }
];
