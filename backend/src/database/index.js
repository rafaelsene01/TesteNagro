import Sequelize from 'sequelize';

import Pessoa from '../app/models/Pessoa';
import Imovel from '../app/models/Imovel';

import databaseConfig from '../config/database';

const models = [Pessoa, Imovel];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
