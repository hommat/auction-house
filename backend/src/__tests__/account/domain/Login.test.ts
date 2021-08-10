import { Login } from '@account/domain';
import { mockLogin1, mockLogin2 } from '@mocks/account';
import { ValidationFailedException, Validator } from '@shared-kernel/validation';

describe('Login', () => {
  describe('create', () => {
    it('should throw ValidationFailedException when validation fails', () => {
      jest.spyOn(Validator.prototype, 'validate').mockImplementationOnce(() => {
        throw new ValidationFailedException('', {});
      });

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
