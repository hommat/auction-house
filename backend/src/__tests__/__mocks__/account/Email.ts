import { Email } from '@account/domain';

export const mockEmail1 = (): Email => Email.create('validmail1@domain.com');
export const mockEmail2 = (): Email => Email.create('validmail2@domain.com');
