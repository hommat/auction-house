import { CompositeSpecification } from '@shared-kernel/specification';

export class IntegerSpecification extends CompositeSpecification<number> {
  public isSatisfiedBy(candidate: number): boolean {
    return Number.isInteger(candidate);
  }
}
