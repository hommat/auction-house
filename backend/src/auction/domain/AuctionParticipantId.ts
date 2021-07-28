import { AuctionParticipantIdMinValueException } from '@auction/domain/exception/auction-participant-id';
import { AuctionParticipantIdMinValueSpecification } from '@auction/domain/specification/auction-participant-id';

export class AuctionParticipantId {
  public static create(value: number): AuctionParticipantId {
    const auctionParticipantId = new AuctionParticipantId(value);

    const auctionParticipantIdMinValueSpecification =
      new AuctionParticipantIdMinValueSpecification();
    if (!auctionParticipantIdMinValueSpecification.isSatisfiedBy(auctionParticipantId)) {
      throw new AuctionParticipantIdMinValueException();
    }

    return auctionParticipantId;
  }

  private constructor(private _value: number) {}

  public clone(): AuctionParticipantId {
    return new AuctionParticipantId(this._value);
  }

  public equals(anotherId: AuctionParticipantId): boolean {
    return this._value === anotherId.value;
  }

  public get value(): number {
    return this._value;
  }
}
