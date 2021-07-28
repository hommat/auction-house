import { AuctionParticipantId } from '@auction/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MinValueSpecification } from '@shared-kernel/specification/number';

export class AuctionParticipantIdMinValueSpecification extends CompositeSpecification<AuctionParticipantId> {
  private minValueSpecification = new MinValueSpecification(0);

  public isSatisfiedBy(candidate: AuctionParticipantId): boolean {
    return this.minValueSpecification.isSatisfiedBy(candidate.value);
  }
}
