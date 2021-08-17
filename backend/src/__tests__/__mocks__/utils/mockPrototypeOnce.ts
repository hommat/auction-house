export function mockPrototypeOnce(o: any, methodName: string, response?: any): void {
  jest.spyOn(o.prototype, methodName).mockImplementationOnce(() => response);
}

export function mockPrototypeOnceWithoutResponse(
  o: any,
  methodName: string,
  mockFn: jest.Mock = jest.fn()
): void {
  jest.spyOn(o.prototype, methodName).mockImplementationOnce(mockFn);
}
