import * as Joi from '@hapi/joi';

const params = Joi.object({
  clienteId: Joi.number().required(),
  id: Joi.number().required()
});

const payload = Joi.object({
  valor: Joi.number().required(),
  produtos: Joi.array().min(1).required()
});

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
