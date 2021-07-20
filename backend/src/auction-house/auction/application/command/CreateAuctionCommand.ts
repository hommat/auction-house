import { Command } from '@shared-kernel/command';

export class CreateAuctionCommand extends Command {
  constructor(private _auctionParticipantId: number) {
    super();
  }

  public get auctionParticipantId(): number {
    return this._auctionParticipantId;
  }
}
