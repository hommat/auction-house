import { Password } from '@account/domain';
import { mockPassword1, mockPassword2 } from '@mocks/account';
import { ValidationFailedException, Validator } from '@shared-kernel/validation';

describe('Password', () => {
  describe('create', () => {
    it('should throw ValidationFailedException when validation fails', () => {
      jest.spyOn(Validator.prototype, 'validate').mockImplementationOnce(() => {
        throw new ValidationFailedException('', {});
      });

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
