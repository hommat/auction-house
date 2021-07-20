import { MakeBidCommand } from '@auction/application/command';
import {
  AuctionId,
  AuctionParticipant,
  AuctionParticipantId,
  Bid,
  BidAmount,
} from '@auction/domain';
import { IAuctionRepository } from '@auction/domain/repository';
import { SecureCommandHandler } from '@security/application/command';
import { IAccessService } from '@security/application/service/access-service';

export class MakeBidCommandHandler extends SecureCommandHandler<MakeBidCommand> {
  constructor(
    private _auctionRepository: IAuctionRepository,
    private _accessService: IAccessService
  ) {
    super();
  }

  public async executeSecure(command: MakeBidCommand): Promise<void> {
    const auctionId = AuctionId.create(command.auctionId);
    const bidOwnerId = AuctionParticipantId.create(command.bidOwnerId);

    const bidOwner = new AuctionParticipant(bidOwnerId);
    const bidAmount = BidAmount.create(command.bidAmount);

    const auction = await this._auctionRepository.findOne(auctionId);
    const bid = new Bid(bidOwner, bidAmount);

    auction.makeBid(bid);

    return this._auctionRepository.save(auction);
  }

  public hasAccess(command: MakeBidCommand): Promise<boolean> {
    return this._accessService.hasMakeBidAccess(command.bidOwnerId);
  }
}
