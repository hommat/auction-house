import { AuctionId, AuctionParticipant, Bid } from '@auction/domain';
import {
  BidMadeByAuctionOwnerException,
  BidWorseThanCurrentBestBidException,
} from '@auction/domain/exception/auction';

export class Auction {
  constructor(
    private _auctionId: AuctionId,
    private _auctionOwner: AuctionParticipant,
    private _bids: Bid[] = []
  ) {}

  public makeBid(bid: Bid): void {
    if (this.isBidMadeByAuctionOwner(bid)) {
      throw new BidMadeByAuctionOwnerException();
    }

    if (this.isBidWorseThanCurrentBestBid(bid)) {
      throw new BidWorseThanCurrentBestBidException();
    }

    this.acceptBid(bid);
  }

  private isBidMadeByAuctionOwner(bid: Bid): boolean {
    return bid.owner.equals(this._auctionOwner);
  }

  private isBidWorseThanCurrentBestBid(bid: Bid): boolean {
    return this.hasAnyBid && bid.isWorseThan(this.currentBestBid);
  }

  private acceptBid(bid: Bid): void {
    this._bids.push(bid);
  }

  public get auctionId(): AuctionId {
    return this._auctionId;
  }

  private get hasAnyBid(): boolean {
    return this._bids.length > 0;
  }

  private get currentBestBid(): Bid {
    return this._bids[this._bids.length - 1];
  }
}
