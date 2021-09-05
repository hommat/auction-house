import { Sequelize } from 'sequelize-typescript';

export async function clear(sequelize: Sequelize): Promise<void> {
  const destroyPromises = sequelize.modelManager.all.map((model) =>
    sequelize.getRepository(model as any).destroy({ where: {} })
  );

  await Promise.all(destroyPromises);
}
