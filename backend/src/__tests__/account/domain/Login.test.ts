import { Login } from '@account/domain';
import { mockLogin1, mockLogin2 } from '@mocks/account';
import { mockValidationFailure } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

describe('Login', () => {
  describe('create', () => {
    it('should throw ValidationFailedException when validation fails', () => {
      mockValidationFailure(true);

      expect(() => Login.create(mockLogin1().value)).toThrow(ValidationFailedException);
    });
  });

  describe('equals', () => {
    it('should return true when values are the same', () => {
      expect(mockLogin1().equals(mockLogin1())).toBe(true);
    });

    it('should return false when values are not the same', () => {
      expect(mockLogin1().equals(mockLogin2())).toBe(false);
    });
  });
});
