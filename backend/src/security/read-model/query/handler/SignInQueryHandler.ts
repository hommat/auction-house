import { Repository, Sequelize } from 'sequelize-typescript';

import { IPasswordHashingService } from '@account/application/service/password-hashing-service';
import { Account } from '@account/infrastructure/repository/sequelize/model';
import { IJwtService } from '@security/application/service/jwt-service';
import { JwtPayload, UserId } from '@security/domain';
import { InvalidCredentialsException } from '@security/read-model/exception';
import { SingInQuery } from '@security/read-model/query';
import { SignInQueryOutput } from '@security/read-model/query/output';
import { IQueryHandler } from '@shared-kernel/cqrs/query';
import { Uuid } from '@shared-kernel/domain';

export class SignInQueryHandler implements IQueryHandler<SingInQuery, SignInQueryOutput> {
  private _accountRepository: Repository<Account>;

  constructor(
    private _passwordHashingService: IPasswordHashingService,
    private _jwtService: IJwtService,
    private _sequelize: Sequelize
  ) {
    this._accountRepository = this._sequelize.getRepository(Account);
  }

  public async execute(query: SingInQuery): Promise<SignInQueryOutput> {
    const { login, password } = query;
    const hashedPassword = await this._passwordHashingService.hash(password);

    const account = await this._accountRepository.findOne({
      where: {
        login: login.value,
        password: hashedPassword.value,
      },
      attributes: ['id'],
    });

    if (account === null) {
      throw new InvalidCredentialsException();
    }

    const payload = new JwtPayload(new UserId(new Uuid(account.id)));
    const jwt = this._jwtService.sign(payload);

    return new SignInQueryOutput(jwt.value);
  }
}
