import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

import { AccountStatus } from '@account/domain';
import { AccountAttributes } from '@account/infrastructure/repository/sequelize/model/attributes';

@Table
export class Account extends Model<AccountAttributes, AccountAttributes> {
  @PrimaryKey
  @Column(DataType.UUID)
  public id: string;

  @Column(DataType.UUID)
  public activationToken: string | null;

  @Column(DataType.UUID)
  public changePasswordToken: string | null;

  @Column(DataType.STRING(64))
  public email: string;

  @Column(DataType.STRING(64))
  public login: string;

  @Column(DataType.STRING(128))
  public password: string;

  @Column(DataType.STRING(32))
  public status: AccountStatus;
}
