import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
    class Categorias extends Model {}

    Categorias.init({
        descricao: dataTypes.STRING
    }, {sequelize, modelName: 'categorias', tableName: 'categorias' });

    return Categorias;
}