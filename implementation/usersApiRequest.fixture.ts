import { request as playwrightRequest, APIRequestContext, test as base } from '@playwright/test';
import { UsersApiClient } from '../client/usersAPI/UsersApi';
import { UsersApiResponseSteps } from '../client/usersAPI/UsersApi.steps';

export const test = base.extend<{ usersApiRequest: APIRequestContext, usersSteps: UsersApiResponseSteps }>({
  usersApiRequest: async ({}, use) => {
    const context = await playwrightRequest.newContext();
    await use(context);
    await context.dispose();
  },
  usersSteps: async ({ usersApiRequest }, use) => {
    const client = new UsersApiClient(usersApiRequest);
    const usersSteps = new UsersApiResponseSteps(client);
    await use(usersSteps);
    return usersSteps;
  },
});