import { request as playwrightRequest, APIRequestContext, test as base } from '@playwright/test';

export const test = base.extend<{ usersApiRequest: APIRequestContext}>({
  usersApiRequest: async ({}, use) => {
    const context = await playwrightRequest.newContext();
    await use(context);
    await context.dispose();
  }
});
