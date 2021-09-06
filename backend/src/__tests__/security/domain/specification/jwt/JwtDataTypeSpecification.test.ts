import { Jwt } from '@security/domain';
import { JwtDataTypeSpecification } from '@security/domain/specification/jwt';
import {
  ValidationError,
  ValidationErrorDataType,
  ValidationErrorType,
} from '@shared-kernel/validation';

let jwtDataTypeSpecification: JwtDataTypeSpecification;

beforeEach(() => {
  jwtDataTypeSpecification = new JwtDataTypeSpecification();
});

describe('JwtDataTypeSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when jwt is string', () => {
      const jwt1 = new Jwt('123');

      expect(jwtDataTypeSpecification.isSatisfiedBy(jwt1)).toBe(true);
    });

    it('returns false when jwt is not string', () => {
      const jwt1 = new Jwt(123 as any);

      expect(jwtDataTypeSpecification.isSatisfiedBy(jwt1)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = jwtDataTypeSpecification.validationError();
    });

    it('should have invalid type type', () => {
      expect(validationError.type).toBe(ValidationErrorType.INVALID_TYPE);
    });

    it('should have 1 detail', () => {
      expect(Object.keys(validationError.details.details).length).toBe(1);
    });

    it('should have type detail equal string', () => {
      expect(validationError.details.details.type).toBe(ValidationErrorDataType.STRING);
    });
  });
});
