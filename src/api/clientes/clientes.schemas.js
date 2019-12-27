import * as Joi from '@hapi/joi';

console.log("Schemas");

const params = Joi.object({    
  id: Joi.number().required(),
  });

const payload = Joi.object({  
  nome: Joi.string().min(3).required(),
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
