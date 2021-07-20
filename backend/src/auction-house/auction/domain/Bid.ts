import { BidAmount } from './BidAmount';
import { AuctionParticipant } from './AuctionParticipant';

export class Bid {
  constructor(private _bidOwner: AuctionParticipant, private _amount: BidAmount) {}

  public isWorseThan(bid: Bid): boolean {
    return this._amount.value < bid._amount.value;
  }

  public get owner(): AuctionParticipant {
    return this._bidOwner;
  }

  public get amount(): BidAmount {
    return this._amount.clone();
  }
}
