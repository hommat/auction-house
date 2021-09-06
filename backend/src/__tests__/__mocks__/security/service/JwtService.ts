import { IJwtService } from '@security/application/service/jwt-service';
import { mockService } from '@mocks/utils';
import { mockJwt1, mockJwtPayload1 } from '@mocks/security';

export const mockJwtService = mockService<IJwtService>({
  sign: jest.fn().mockReturnValue(mockJwt1()),
  verify: jest.fn().mockReturnValue(mockJwtPayload1()),
});
