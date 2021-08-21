import { Command } from '@shared-kernel/cqrs/command';

export class CreateAuctionCommand extends Command {
  constructor(private _auctionParticipantId: number) {
    super();
  }

  public get auctionParticipantId(): number {
    return this._auctionParticipantId;
  }
}
