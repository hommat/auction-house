import { CreateAuctionCommand } from '@auction/application/command';
import { Auction, AuctionParticipant, AuctionParticipantId } from '@auction/domain';
import { IAuctionRepository } from '@auction/domain/repository';
import { SecureCommandHandler } from '@security/application/command';
import { IAccessService } from '@security/application/service/access-service';

export class CreateAuctionCommandHandler extends SecureCommandHandler<CreateAuctionCommand> {
  constructor(
    private _auctionRepository: IAuctionRepository,
    private _accessService: IAccessService
  ) {
    super();
  }

  public async executeSecure(command: CreateAuctionCommand): Promise<void> {
    const auctionParticipantId = AuctionParticipantId.create(command.auctionParticipantId);
    const auctionParticipant = new AuctionParticipant(auctionParticipantId);
    const auctionId = await this._auctionRepository.generateId();
    const auction = new Auction(auctionId, auctionParticipant);

    return this._auctionRepository.create(auction);
  }

  public hasAccess(command: CreateAuctionCommand): Promise<boolean> {
    return this._accessService.hasCreateAuctionAccess(command.auctionParticipantId);
  }
}
