import { mockPrototypeOnce } from './mockPrototypeOnce';

export function mockSpecificationOnce(specification: any, response: boolean): void {
  mockPrototypeOnce(specification, 'isSatisfiedBy', response);
}
