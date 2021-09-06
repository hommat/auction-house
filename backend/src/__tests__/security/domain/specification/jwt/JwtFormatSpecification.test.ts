import { Jwt } from '@security/domain';
import { JwtFormatSpecification } from '@security/domain/specification/jwt';
import { ValidationError, ValidationErrorType } from '@shared-kernel/validation';

let jwtFormatSpecification: JwtFormatSpecification;

beforeEach(() => {
  jwtFormatSpecification = new JwtFormatSpecification();
});

describe('JwtFormatSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when jwt has proper format', () => {
      const jwt1 = new Jwt(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      );

      expect(jwtFormatSpecification.isSatisfiedBy(jwt1)).toBe(true);
    });

    it('returns false when jwt has not proper format', () => {
      const jwt1 = new Jwt('');
      const jwt2 = new Jwt('...');
      const jwt3 = new Jwt('a.b.c.d');
      const jwt4 = new Jwt('a..b.c');

      expect(jwtFormatSpecification.isSatisfiedBy(jwt1)).toBe(false);
      expect(jwtFormatSpecification.isSatisfiedBy(jwt2)).toBe(false);
      expect(jwtFormatSpecification.isSatisfiedBy(jwt3)).toBe(false);
      expect(jwtFormatSpecification.isSatisfiedBy(jwt4)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = jwtFormatSpecification.validationError();
    });

    it('should have invalid format type', () => {
      expect(validationError.type).toBe(ValidationErrorType.INVALID_FORMAT);
    });

    it('should not have details', () => {
      expect(Object.keys(validationError.details.details).length).toBe(0);
    });
  });
});
