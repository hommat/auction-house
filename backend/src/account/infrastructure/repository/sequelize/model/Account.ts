import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table
export class Account extends Model {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  public id: string;

  @Column(DataType.UUIDV4)
  public activationToken: string | null;

  @Column(DataType.UUIDV4)
  public changePasswordToken: string | null;

  @Column(DataType.STRING(64))
  public email: string;

  @Column(DataType.STRING(64))
  public login: string;

  @Column(DataType.STRING(128))
  public password: string;

  @Column(DataType.STRING(32))
  public status: string;
}
