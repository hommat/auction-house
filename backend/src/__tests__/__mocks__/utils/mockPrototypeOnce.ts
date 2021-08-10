export function mockPrototypeOnce(o: any, methodName: string, response?: any): void {
  jest.spyOn(o.prototype, methodName).mockImplementationOnce(() => response);
}
