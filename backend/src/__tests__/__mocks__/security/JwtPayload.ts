import { mockUserId1 } from '@mocks/security';
import { JwtPayload } from '@security/domain';

export const mockJwtPayload1 = (): JwtPayload => new JwtPayload(mockUserId1());
