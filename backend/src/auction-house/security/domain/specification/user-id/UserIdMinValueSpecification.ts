import { UserId } from '@security/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MinValueSpecification } from '@shared-kernel/specification/number';

export class UserIdMinValueSpecification extends CompositeSpecification<UserId> {
  private minValueSpecification = new MinValueSpecification(0);

  public isSatisfiedBy(candidate: UserId): boolean {
    return this.minValueSpecification.isSatisfiedBy(candidate.value);
  }
}
