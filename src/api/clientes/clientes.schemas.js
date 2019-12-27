import * as Joi from '@hapi/joi';
import isValidCpf from '@brazilian-utils/is-valid-cpf';


console.log("Schemas");
const params = Joi.object({
  id: Joi.number().required()
});

const payload = Joi.object({
  nome: Joi.string().required(),
  documento: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

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
