import { Password } from '@account/domain';
import { mockPassword1 } from '@mocks/account';
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
