import { IAccountRepository } from '@account/domain/repository';
import { mockAccount1 } from '@mocks/account';
import { mockService } from '@mocks/utils';

export const mockAccountRepository = mockService<IAccountRepository>({
  create: jest.fn().mockReturnValue(Promise.resolve()),
  findByActivationToken: jest.fn().mockResolvedValue(mockAccount1()),
  findByChangePasswordToken: jest.fn().mockResolvedValue(mockAccount1()),
  findByEmail: jest.fn().mockResolvedValue(mockAccount1()),
  findByLoginOrEmail: jest.fn().mockResolvedValue([]),
  save: jest.fn().mockReturnValue(Promise.resolve()),
});
