import { Command } from '@shared-kernel/command';

export class MakeBidCommand extends Command {
  constructor(private _auctionId: number, private _bidOwnerId: number, private _bidAmount: number) {
    super();
  }

  public get auctionId(): number {
    return this._auctionId;
  }

  public get bidOwnerId(): number {
    return this._bidOwnerId;
  }

  public get bidAmount(): number {
    return this._bidAmount;
  }
}
