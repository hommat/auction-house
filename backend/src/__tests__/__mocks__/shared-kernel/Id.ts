import { mockUuid1, mockUuid2 } from '@mocks/shared-kernel';
import { Id } from '@shared-kernel/domain';

export const mockId1 = (): Id => new Id(mockUuid1());
export const mockId2 = (): Id => new Id(mockUuid2());
