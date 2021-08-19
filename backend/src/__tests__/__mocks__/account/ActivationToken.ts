import { ActivationToken } from '@account/domain';
import { mockUuid1, mockUuid2 } from '@mocks/shared-kernel';

export const mockActivationToken1 = (): ActivationToken => new ActivationToken(mockUuid1());
export const mockActivationToken2 = (): ActivationToken => new ActivationToken(mockUuid2());
