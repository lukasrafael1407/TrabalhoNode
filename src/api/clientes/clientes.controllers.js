import { CREATED, NO_CONTENT } from 'http-status';
import { authenticate, getToken } from '../utils/auth.utils';
import ClientesDAO from './clientes.dao';
import Boom from '@hapi/boom';

const clientesDAO = new ClientesDAO();
const validarCpf = require('validar-cpf');

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
    if (validarCpf(payload.documento)){

      const clienteEmail = await clientesDAO.findByEmail(payload.email);
      const clienteDocumento = await clientesDAO.findByDocumento(payload.documento);
      
      if (clienteEmail) {
        
        throw Boom.badData("Email já existe para o Cliente de Id: " + clienteEmail.id);

      } else if (clienteDocumento) {
        
        throw Boom.badData("CPF já existe para o Cliente de Id: " + clienteDocumento.id);

      } else {

        const cliente = await clientesDAO.create(payload);
        return h.response(cliente).code(CREATED);

      }
      
    } else {
      throw Boom.badData("CPF Invalido!");
    }
  }

  async update({ payload, params }, h) {
    const { id } = params;

    if (validarCpf(payload.documento)){

      const clienteEmail = await clientesDAO.findByEmail(payload.email);
      const clienteDocumento = await clientesDAO.findByDocumento(payload.documento);

      if ((clienteEmail) && (clienteEmail.id !== params.id)) {
        
        throw Boom.badData("Email já existe para o Cliente de Id: " + clienteEmail.id);

      } else if ((clienteDocumento) && (clienteDocumento.id !== params.id)) {
        
        throw Boom.badData("CPF já existe para o Cliente de Id: " + clienteDocumento.id);

      } else {
        
        return await clientesDAO.update(id, payload);
      
      }

    } else
    {
      throw Boom.badData("CPF Invalido!");
    }   
  }

  async destroy({ params }, h) {
    const { id } = params;

    await clientesDAO.destroy(id);

    return h.response().code(NO_CONTENT);
  }
}
