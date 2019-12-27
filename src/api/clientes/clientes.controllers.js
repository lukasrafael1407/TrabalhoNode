import { CREATED, NO_CONTENT } from 'http-status';
import { authenticate, getToken } from '../utils/auth.utils';
import ClientesDAO from './clientes.dao';

const clientesDAO = new ClientesDAO();
console.log("Controller");

export default class ClientesController {

  async list(request, h) {    
    return await clientesDAO.findAll();
  }

  async detail({ params }, h) {
    const { id } = params;

    return await clientesDAO.findByID(id);
  }

  async login({ payload }, h) {
    const cliente = await authenticate(payload);
    const token = getToken({
      id: cliente.id,
      email: cliente.email,      
    });

    return { cliente, token };
  }

  async create({ payload }, h) {
    const cliente = await clientesDAO.create(payload);

    return h.response(cliente).code(CREATED);
  }

  async update({ payload, params }, h) {
    const { id } = params;

    return await clientesDAO.update(id, payload);
  }

  async destroy({ params }, h) {
    const { id } = params;

    await clientesDAO.destroy(id);

    return h.response().code(NO_CONTENT);
  }
}
