import { Sequelize } from 'sequelize-typescript';

import { Account } from '@account/infrastructure/repository/sequelize/model';

export async function connect(): Promise<Sequelize> {
  const sequelize = new Sequelize({
    host: process.env.POSTGRES_HOST!,
    port: +process.env.POSTGRES_PORT!,
    database: process.env.POSTGRES_DB!,
    username: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    dialect: 'postgres',
    models: [Account],
    logging: false,
  });

  await sequelize.authenticate();

  return sequelize;
}
