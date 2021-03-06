import * as Joi from '@hapi/joi';

const params = Joi.object({
  clienteId: Joi.number().required(),
  id: Joi.number().required()
});

const payload = Joi.object({
  produtos: Joi.array().min(1).items(
    Joi.object({
      id: Joi.number()
    })
  ).required()
}).label("Pedido");

export const detail = {
  params
};

export const create = {
  payload
};

export const update = {
  params,
  payload
};
