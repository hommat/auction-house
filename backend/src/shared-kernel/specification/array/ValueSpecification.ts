import { CompositeSpecification } from '@shared-kernel/specification';

export class ValueSpecification extends CompositeSpecification<number> {
  constructor(private _availableValues: Array<string | number | boolean | null>) {
    super();
  }

  public isSatisfiedBy(candidate: string | number | boolean | null): boolean {
    return this._availableValues.includes(candidate);
  }
}
