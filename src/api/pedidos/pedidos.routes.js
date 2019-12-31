import PedidosController from './pedidos.controllers';
import * as Schemas from './pedidos.schemas';

const controller = new PedidosController();

export default [
  {
    method: 'GET',
    path: '/pedidos/{clienteId}',
    handler: controller.list,
    config: {
      tags: ['api', 'pedidos', 'clientes'],
    }
  },
  {
    method: 'GET',
    path: '/pedidos/{clienteId}/{id}',
    handler: controller.detail,
    config: {
      tags: ['api', 'pedidos', 'clientes'],
      validate: Schemas.detail
    }
  },
  {
    method: 'POST',
    path: '/pedidos/{clienteId}',
    handler: controller.create,
    config: {
      tags: ['api', 'pedidos', 'clientes', 'produtos'],
      validate: Schemas.create
    }
  },
  {
    method: 'PUT',
    path: '/pedidos/{clienteId}/{id}',
    handler: controller.update,
    config: {
      tags: ['api', 'pedidos', 'clientes', 'produtos'],
      validate: Schemas.update
    }
  },
  {
    method: 'DELETE',
    path: '/pedidos/{clienteId}/{id}',
    handler: controller.destroy,
    config: {
      tags: ['api', 'pedidos', 'clientes'],
      validate: Schemas.detail
    }
  }
];
