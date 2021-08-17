import { FastifyReply } from 'fastify';

export interface MockFastifyReply extends FastifyReply {
  mockCode: jest.Mock;
  mockSend: jest.Mock;
}

export const mockReply = (): MockFastifyReply => {
  const mockReply: any = {
    mockCode: function () {
      return this.code;
    },
    mockSend: function () {
      return this.send;
    },
  };

  mockReply.code = jest.fn(() => mockReply);
  mockReply.send = jest.fn(() => mockReply);
  mockReply.mockCode = mockReply.code;
  mockReply.mockSend = mockReply.send;

  return mockReply;
};
