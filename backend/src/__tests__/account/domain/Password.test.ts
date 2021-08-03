import { Password } from '@account/domain';
import { mockPassword1 } from '@mocks/account';
import { ValidationFailedException } from '@shared-kernel/validation/ValidationFailedException';

describe('Password', () => {
  describe('create', () => {
    it('should throw ValidationFailedException when password has 4 or less characters', () => {
      expect(() => Password.create('A'.repeat(3))).toThrow(ValidationFailedException);
      expect(() => Password.create('A'.repeat(4))).toThrow(ValidationFailedException);
      expect(() => Password.create('A'.repeat(5))).not.toThrowError();
    });

    it('should throw ValidationFailedException when password has 11 or more characters', () => {
      expect(() => Password.create('A'.repeat(12))).toThrow(ValidationFailedException);
      expect(() => Password.create('A'.repeat(11))).toThrow(ValidationFailedException);
      expect(() => Password.create('A'.repeat(10))).not.toThrowError();
    });
  });

  describe('getters', () => {
    describe('value', () => {
      it('should return value given while creating', () => {
        const value = mockPassword1().value;
        const password = Password.create(value);

        expect(password.value).toBe(value);
      });
    });
  });
});
