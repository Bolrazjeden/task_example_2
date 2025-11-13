import { request as playwrightRequest, APIRequestContext, test as base } from '@playwright/test';
import { UsersApiClient } from '../client/usersAPI/UsersApi';
import { UsersApiTestSteps } from '../client/usersAPI/UsersApi.steps';

export const test = base.extend<{ usersApiRequest: APIRequestContext, usersSteps: UsersApiTestSteps }>({
  usersApiRequest: async ({}, use) => {
    const context = await playwrightRequest.newContext();
    await use(context);
    await context.dispose();
  },
  usersSteps: async ({ usersApiRequest }, use) => {
    const client = new UsersApiClient(usersApiRequest);
    const usersSteps = new UsersApiTestSteps(client);
    await use(usersSteps);
    return usersSteps;
  },
});