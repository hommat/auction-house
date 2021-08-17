import { Validator, ValidationFailedException } from '@shared-kernel/validation';

export function mockValidationFailure(once = false): void {
  if (once) {
    jest.spyOn(Validator.prototype, 'validate').mockImplementationOnce(() => {
      throw new ValidationFailedException('', {});
    });

    return;
  }

  jest.spyOn(Validator.prototype, 'validate').mockImplementation(() => {
    throw new ValidationFailedException('', {});
  });
}
