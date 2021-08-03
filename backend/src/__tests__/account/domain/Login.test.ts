import { Login } from '@account/domain';
import { mockLogin1, mockLogin2 } from '@mocks/account';
import { ValidationFailedException } from '@shared-kernel/validation';

describe('Login', () => {
  describe('create', () => {
    it('should throw ValidationFailedException when login has 4 or less characters', () => {
      expect(() => Login.create('A'.repeat(3))).toThrow(ValidationFailedException);
      expect(() => Login.create('A'.repeat(4))).toThrow(ValidationFailedException);
      expect(() => Login.create('A'.repeat(5))).not.toThrowError();
    });

    it('should throw ValidationFailedException when login has 11 or more characters', () => {
      expect(() => Login.create('A'.repeat(12))).toThrow(ValidationFailedException);
      expect(() => Login.create('A'.repeat(11))).toThrow(ValidationFailedException);
      expect(() => Login.create('A'.repeat(10))).not.toThrowError();
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

  describe('getters', () => {
    describe('value', () => {
      it('should return value given while creating', () => {
        const value = mockLogin1().value;
        const login = Login.create(value);

        expect(login.value).toBe(value);
      });
    });
  });
});
