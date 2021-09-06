import { Repository, Sequelize } from 'sequelize-typescript';

import { Account } from '@account/infrastructure/repository/sequelize/model';
import {
  mockHashedPassword1,
  mockHashedPassword2,
  mockLogin1,
  mockPassword1,
} from '@mocks/account';
import { mockPasswordHashingService } from '@mocks/account/service';
import { mockJwtService } from '@mocks/security/service';
import { mockUuid1 } from '@mocks/shared-kernel';
import { clear, connect } from '@scripts/db';
import { InvalidCredentialsException } from '@security/read-model/exception';
import { SingInQuery } from '@security/read-model/query';
import { SignInQueryInput } from '@security/read-model/query/input';
import { SequelizeSignInQueryHandler } from '@security/read-model/query/handler/sequelize';
import { mockJwt1 } from '@mocks/security';

let sequelize: Sequelize;
let accountRepo: Repository<Account>;
let query: SingInQuery;

beforeAll(async () => {
  sequelize = await connect();
});

beforeEach(async () => {
  accountRepo = sequelize.getRepository(Account);
  query = SingInQuery.create(new SignInQueryInput(mockLogin1().value, mockPassword1().value));
});

afterEach(async () => {
  await clear(sequelize);
});

afterAll(async () => {
  await sequelize.close();
});

describe('SequelizeSignInQueryHandler', () => {
  it('should query db with hashedPassword', async () => {
    const hashedPassword = mockHashedPassword2();

    const handler = new SequelizeSignInQueryHandler(
      mockPasswordHashingService({ hash: jest.fn().mockReturnValue(hashedPassword) }),
      mockJwtService(),
      sequelize
    );

    await accountRepo.create({
      id: mockUuid1().value,
      login: mockLogin1().value,
      password: hashedPassword.value,
    } as any);

    const output = await handler.execute(query);

    expect(output).toBeTruthy();
  });

  it('should throw InvalidCredentialsException when user with given login and password does not exist', async () => {
    const handler = new SequelizeSignInQueryHandler(
      mockPasswordHashingService(),
      mockJwtService(),
      sequelize
    );

    try {
      await handler.execute(query);
      expect(false).toBe(true);
    } catch (err) {
      expect(err.constructor).toBe(InvalidCredentialsException);
    }
  });

  it('should return signed jwt', async () => {
    const jwt = mockJwt1();

    const handler = new SequelizeSignInQueryHandler(
      mockPasswordHashingService(),
      mockJwtService({ sign: jest.fn().mockReturnValue(jwt) }),
      sequelize
    );

    await accountRepo.create({
      id: mockUuid1().value,
      login: mockLogin1().value,
      password: mockHashedPassword1().value,
    } as any);

    const output = await handler.execute(query);

    expect(output.jwt).toBe(jwt.value);
  });
});
