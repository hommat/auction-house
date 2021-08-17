import { Validator } from '@shared-kernel/validation';

export function mockValidationSuccess(once = false): void {
  if (once) {
    jest.spyOn(Validator.prototype, 'validate').mockImplementationOnce(jest.fn());

    return;
  }

  jest.spyOn(Validator.prototype, 'validate').mockImplementation(jest.fn());
}
