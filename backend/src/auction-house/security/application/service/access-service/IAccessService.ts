export interface IAccessService {
  hasCreateAuctionAccess(userId: number): Promise<boolean>;
  hasMakeBidAccess(userId: number): Promise<boolean>;
}
