import { IAccountRepository } from '@account/domain/repository';
import { mockAccount1, mockAccountId1 } from '@mocks/account';
import { mockService } from '@mocks/utils';

export const mockAccountRepository = mockService<IAccountRepository>({
  create: jest.fn().mockReturnValue(Promise.resolve()),
  findByActivationToken: jest.fn().mockResolvedValue(mockAccount1()),
  findByLoginOrEmail: jest.fn().mockResolvedValue([]),
  generateId: jest.fn().mockResolvedValue(mockAccountId1()),
  save: jest.fn().mockReturnValue(Promise.resolve()),
});
