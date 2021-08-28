export interface IAccessService {
  hasCreateAuctionAccess(userId: string): Promise<boolean>;
  hasMakeBidAccess(userId: string): Promise<boolean>;
}
