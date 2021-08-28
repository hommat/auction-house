import { ChangePasswordToken } from '@account/domain';
import { mockUuid1, mockUuid2 } from '@mocks/shared-kernel';

export const mockChangePasswordToken1 = (): ChangePasswordToken =>
  new ChangePasswordToken(mockUuid1());
export const mockChangePasswordToken2 = (): ChangePasswordToken =>
  new ChangePasswordToken(mockUuid2());
