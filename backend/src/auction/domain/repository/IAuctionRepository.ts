import { Auction } from '../Auction';
import { AuctionId } from '../AuctionId';

export interface IAuctionRepository {
  findOne(auctionId: AuctionId): Promise<Auction>;
  generateId(): Promise<AuctionId>;
  create(auction: Auction): Promise<void>;
  save(auction: Auction): Promise<void>;
}
