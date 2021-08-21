import { mockLogin1, mockPassword1 } from '@mocks/account';
import { SignInQueryInput } from '@security/read-model/query/input';
import { SingInQuery } from '@security/read-model/query';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

describe('SignInQuery', () => {
  describe('create', () => {
    it('should throw InvalidInputException when login is not valid', () => {
      const input = new SignInQueryInput('', mockPassword1().value);

      expect(() => SingInQuery.create(input)).toThrow(InvalidInputException);
    });

    it('should throw InvalidInputException when password is not valid', () => {
      const input = new SignInQueryInput(mockLogin1().value, '');

      expect(() => SingInQuery.create(input)).toThrow(InvalidInputException);
    });

    it('should return SignInQuery when input is valid', () => {
      const input = new SignInQueryInput(mockLogin1().value, mockPassword1().value);
      const singInQuery = SingInQuery.create(input);

      expect(singInQuery.login.equals(mockLogin1())).toBe(true);
      expect(singInQuery.password.equals(mockPassword1())).toBe(true);
    });
  });
});
