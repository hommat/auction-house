import { Id } from '@shared-kernel/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MinValueSpecification } from '@shared-kernel/specification/number';

export class IdMinValueSpecification extends CompositeSpecification<Id> {
  private minValueSpecification = new MinValueSpecification(1);

  public isSatisfiedBy(candidate: Id): boolean {
    return this.minValueSpecification.isSatisfiedBy(candidate.value);
  }
}
