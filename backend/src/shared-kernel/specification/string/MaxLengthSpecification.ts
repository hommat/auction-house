import { CompositeSpecification } from '@shared-kernel/specification';

export class MaxLengthSpecification extends CompositeSpecification<string> {
  constructor(private _maxLength: number) {
    super();
  }

  public isSatisfiedBy(candidate: string): boolean {
    return candidate.length <= this._maxLength;
  }
}
