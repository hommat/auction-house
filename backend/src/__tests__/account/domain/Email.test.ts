import { Email } from '@account/domain';
import { mockEmail1, mockEmail2 } from '@mocks/account';
import { mockValidationFailure } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

describe('Email', () => {
  describe('create', () => {
    it('should throw ValidationFailedException when validation fails', () => {
      mockValidationFailure(true);

      expect(() => Email.create(mockEmail1().value)).toThrow(ValidationFailedException);
    });
  });

  describe('equals', () => {
    it('should return true when values are the same', () => {
      expect(mockEmail1().equals(mockEmail1())).toBe(true);
    });

    it('should return false when values are not the same', () => {
      expect(mockEmail1().equals(mockEmail2())).toBe(false);
    });
  });
});
