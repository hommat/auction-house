import { CompositeSpecification } from '@shared-kernel/specification';

export class MinLengthSpecification extends CompositeSpecification<string> {
  constructor(private _minLength: number) {
    super();
  }

  public isSatisfiedBy(candidate: string): boolean {
    return candidate.length >= this._minLength;
  }
}
