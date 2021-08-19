import { Password } from '@account/domain';
import { mockPassword1, mockPassword2 } from '@mocks/account';
import { mockValidationFailure } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

describe('Password', () => {
  describe('create', () => {
    it('should throw ValidationFailedException when validation fails', () => {
      mockValidationFailure(true);

      expect(() => Password.create(mockPassword1().value)).toThrow(ValidationFailedException);
    });
  });

  describe('equals', () => {
    it('should return true when values are the same', () => {
      expect(mockPassword1().equals(mockPassword1())).toBe(true);
    });

    it('should return false when values are not the same', () => {
      expect(mockPassword1().equals(mockPassword2())).toBe(false);
    });
  });
});
