import { AccountId } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MinValueSpecification } from '@shared-kernel/specification/number';

export class AccountIdMinValueSpecification extends CompositeSpecification<AccountId> {
  private minValueSpecification = new MinValueSpecification(0);

  public isSatisfiedBy(candidate: AccountId): boolean {
    return this.minValueSpecification.isSatisfiedBy(candidate.value);
  }
}
