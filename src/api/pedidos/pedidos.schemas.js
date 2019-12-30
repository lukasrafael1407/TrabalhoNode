import * as Joi from '@hapi/joi';

const params = Joi.object({
  clienteId: Joi.number().required(),
  id: Joi.number().required()
});

const payload = Joi.object({
  valor: Joi.number().required()
  // valor: Joi.string().min(5).max(100).required(),
  // content: Joi.string().min(10).required()
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
