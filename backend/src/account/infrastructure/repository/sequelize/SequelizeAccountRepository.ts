import { WhereOptions, Op } from 'sequelize';
import { Repository, Sequelize } from 'sequelize-typescript';

import { Account, ActivationToken, ChangePasswordToken, Email, Login } from '@account/domain';
import { IAccountRepository } from '@account/domain/repository';
import { AccountAttributes } from '@account/infrastructure/repository/sequelize/model/attributes';
import { Account as AccountModel } from '@account/infrastructure/repository/sequelize/model';
import { AccountConverter } from '@account/infrastructure/repository/sequelize/converter';

export class SequelizeAccountRepository implements IAccountRepository {
  private _accountRepository: Repository<AccountModel>;

  constructor(private _sequelize: Sequelize) {
    this._accountRepository = this._sequelize.getRepository(AccountModel);
  }

  public async create(account: Account): Promise<void> {
    await this._accountRepository.create(AccountConverter.toPersist(account));
  }

  public async save(account: Account): Promise<void> {
    await this._accountRepository.update(AccountConverter.toPersist(account), {
      where: {
        id: account.accountId.uuid.value,
      },
    });
  }

  public async findByActivationToken(token: ActivationToken): Promise<Account | null> {
    return this.findOneByCriteriaOrNull({
      activationToken: token.uuid.value,
    });
  }

  public async findByChangePasswordToken(
    changePasswordToken: ChangePasswordToken
  ): Promise<Account | null> {
    return this.findOneByCriteriaOrNull({
      changePasswordToken: changePasswordToken.uuid.value,
    });
  }

  public async findByEmail(email: Email): Promise<Account | null> {
    return this.findOneByCriteriaOrNull({
      email: email.value,
    });
  }

  private async findOneByCriteriaOrNull(
    whereOptions: WhereOptions<AccountAttributes>
  ): Promise<Account | null> {
    const account = await this._accountRepository.findOne({
      where: whereOptions,
    });

    return account ? AccountConverter.toDomain(account) : null;
  }

  public async findByLoginOrEmail(login: Login, email: Email): Promise<Account[]> {
    const accounts = await this._accountRepository.findAll({
      where: {
        [Op.or]: {
          login: login.value,
          email: email.value,
        },
      },
    });

    return accounts.map(AccountConverter.toDomain, AccountConverter);
  }
}
