import * as Joi from '@hapi/joi';

console.log("Schemas");
const params = Joi.object({
  id: Joi.number().required()
});

const listcategoria = Joi.object({
  descricao: Joi.string().required()
})

export const detail = {
  params
};

export const create = {
    listcategoria
};

export const update = {
  params,
  listcategoria
};