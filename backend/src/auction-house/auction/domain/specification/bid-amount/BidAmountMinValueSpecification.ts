import { BidAmount } from '@auction/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MinValueSpecification } from '@shared-kernel/specification/number';

export class BidAmountMinValueSpecification extends CompositeSpecification<BidAmount> {
  private minValueSpecification = new MinValueSpecification(0);

  public isSatisfiedBy(candidate: BidAmount): boolean {
    return this.minValueSpecification.isSatisfiedBy(candidate.value);
  }
}
