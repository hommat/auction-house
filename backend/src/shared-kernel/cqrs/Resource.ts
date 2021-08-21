import { ValidationFailedException } from '@shared-kernel/validation';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

export class Resource {
  protected static createSafe<Result>(
    factoryFn: () => Result
  ): [Result | null, ValidationFailedException | null] {
    try {
      const result = factoryFn();

      return [result, null];
    } catch (exception) {
      if (exception instanceof ValidationFailedException) {
        return [null, exception];
      }

      throw exception;
    }
  }

  protected static throwInvalidInputExceptionIfNeeded(
    ...validationExceptionsOrNulls: Array<ValidationFailedException | null>
  ): void {
    const validationExceptions = validationExceptionsOrNulls.filter(
      (exception) => exception !== null
    ) as ValidationFailedException[];

    if (validationExceptions.length > 0) {
      throw new InvalidInputException(validationExceptions);
    }
  }

  public get name(): string {
    return this.constructor.name;
  }
}
