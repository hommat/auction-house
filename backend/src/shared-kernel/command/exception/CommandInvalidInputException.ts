import { ValidationFailedException } from '@shared-kernel/validation';

export class CommandInvalidInputException extends Error {
  constructor(private _validationExceptions: ValidationFailedException[]) {
    super();
  }

  public get validationExceptions(): ValidationFailedException[] {
    return [...this._validationExceptions];
  }
}
