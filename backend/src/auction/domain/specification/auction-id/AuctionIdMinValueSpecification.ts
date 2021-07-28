import { AuctionId } from '@auction/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MinValueSpecification } from '@shared-kernel/specification/number';

export class AuctionIdMinValueSpecification extends CompositeSpecification<AuctionId> {
  private minValueSpecification = new MinValueSpecification(0);

  public isSatisfiedBy(candidate: AuctionId): boolean {
    return this.minValueSpecification.isSatisfiedBy(candidate.value);
  }
}
