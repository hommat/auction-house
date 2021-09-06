import { Jwt } from '@security/domain';
import { mockValidationFailure } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';
import { mockJwt1, mockJwt2 } from '@mocks/security';

describe('Jwt', () => {
  describe('create', () => {
    it('should throw ValidationFailedException when validation fails', () => {
      mockValidationFailure(true);

      expect(() => Jwt.create(mockJwt1().value)).toThrow(ValidationFailedException);
    });
  });

  describe('equals', () => {
    it('should return true when values are the same', () => {
      const payload = new Jwt(mockJwt1().value);

      expect(payload.equals(mockJwt1())).toBe(true);
    });

    it('should return false when values are not the same', () => {
      const payload = new Jwt(mockJwt1().value);

      expect(payload.equals(mockJwt2())).toBe(false);
    });
  });
});
