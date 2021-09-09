import { Argon2PasswordHashingService } from '@account/application/service/password-hashing-service/implementation';
import { mockPassword1 } from '@mocks/account';

describe('Argon2PasswordHashingService', () => {
  describe('hash', () => {
    it('should return hashed password', async () => {
      const password = mockPassword1();

      const hashedPassword = await new Argon2PasswordHashingService().hash(password);
      expect(hashedPassword.value).not.toBe(password.value);
    });
  });
});
