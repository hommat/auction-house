import { IPasswordHashingService } from '@account/application/service/password-hashing-service';
import { mockHashedPassword1 } from '@mocks/account';
import { mockService } from '@mocks/utils';

export const mockPasswordHashingService = mockService<IPasswordHashingService>({
  hash: jest.fn().mockResolvedValue(mockHashedPassword1()),
});
