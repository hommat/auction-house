import { AuctionParticipantId } from '@auction/domain';

export class AuctionParticipant {
  constructor(private _id: AuctionParticipantId) {}

  public equals(anotherAuctionParticipant: AuctionParticipant): boolean {
    return this._id.equals(anotherAuctionParticipant.id);
  }

  public get id(): AuctionParticipantId {
    return this._id.clone();
  }
}
