import type { AccountId } from './kernel';

export type AccountDeleteEvent = {
    type: 'account/deleted/v1';
    payload: {
        accountId: AccountId;
    };
};

export type AccountAddedEvent = {
    type: 'account/added/v1';
    payload: {
        accountId: AccountId;
    };
};

export type GlobalEvents = AccountDeleteEvent | AccountAddedEvent;
