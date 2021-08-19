export function mockService<I>(
  baseMocks: Record<keyof I, jest.Mock>
): (mockOverride?: Partial<Record<keyof I, jest.Mock>>) => I {
  return function (mockOverride: Partial<Record<keyof I, jest.Mock>> = {}): I {
    return { ...baseMocks, ...mockOverride } as any;
  };
}
