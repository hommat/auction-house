import { BidAmountMinValueException } from '@auction/domain/exception/bid-amount';
import { BidAmountMinValueSpecification } from '@auction/domain/specification/bid-amount';

export class BidAmount {
  public static create(value: number): BidAmount {
    const bidAmount = new BidAmount(value);

    const bidAmountMinValueSpecification = new BidAmountMinValueSpecification();
    if (!bidAmountMinValueSpecification.isSatisfiedBy(bidAmount)) {
      throw new BidAmountMinValueException();
    }

    return bidAmount;
  }

  private constructor(private _value: number) {}

  public clone(): BidAmount {
    return new BidAmount(this._value);
  }

  public get value(): number {
    return this._value;
  }
}
