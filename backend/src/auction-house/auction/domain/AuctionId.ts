import { AuctionIdMinValueException } from '@auction/domain/exception/auction-id';
import { AuctionIdMinValueSpecification } from '@auction/domain/specification/auction-id';

export class AuctionId {
  public static create(value: number): AuctionId {
    const auctionId = new AuctionId(value);

    const auctionIdMinValueSpecification = new AuctionIdMinValueSpecification();
    if (!auctionIdMinValueSpecification.isSatisfiedBy(auctionId)) {
      throw new AuctionIdMinValueException();
    }

    return auctionId;
  }

  private constructor(private _value: number) {}

  public get value(): number {
    return this._value;
  }
}
