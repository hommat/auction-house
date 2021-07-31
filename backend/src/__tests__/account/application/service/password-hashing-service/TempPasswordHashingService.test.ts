import { TempPasswordHashingService } from '@account/application/service/password-hashing-service/implementation';
import { mockPassword1 } from '@mocks/account';

describe('TempPasswordHashingService', () => {
  describe('hash', () => {
    it('should return HashedPassword with the same value as given Password', async () => {
      const password = mockPassword1();
      const passwordValue = password.value;

      const hashedPassword = await new TempPasswordHashingService().hash(password);
      expect(hashedPassword.value).toBe(passwordValue);
    });
  });
});
