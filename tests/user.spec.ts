import { UsersApiResponseSteps } from '../client/usersAPI/UsersApi.steps';
import { UsersApiClient } from '../client/usersAPI/UsersApi';
import { PostUserResponseDTO, GetUsersResponseDTO } from '../client/usersAPI/UsersApi.dto';
import { test } from '../implementation/usersApiRequest.fixture';
import testData from '../utils/users.json';
import { expect } from '@playwright/test';

test.describe('Users API', () => {
  let usersSteps: UsersApiResponseSteps;
  let usersData: GetUsersResponseDTO;
  let postUsersResponseData: PostUserResponseDTO;

  test.beforeEach(async ({ usersApiRequest }) => {
    const client = new UsersApiClient(usersApiRequest);
    usersSteps = new UsersApiResponseSteps(client);
  });

  test('Test total property for GET users endpoint', async () => {
    const expectedTotal = 12;

    await test.step('Get users data on page two ', async () => {
      usersData = await usersSteps.getUsersDataOnPageTwo();
    });

    await test.step('Check total property is defined in response', async () => {
      usersSteps.validateTotalPropertyIsDefined(usersData);
    });

    await test.step('Check total property has expected value', async () => {
      usersSteps.validateTotalPropertyValue(usersData, expectedTotal);
    });
  });

  test('Test last_name property for GET users endpoint', async () => {
    await test.step('Get users data on page two ', async () => {
      usersData = await usersSteps.getUsersDataOnPageTwo();
    });

    await test.step('Check last_name property is defined for data objects in response', async () => {
      usersSteps.validateLastNamePropertyIsDefinedForFirstTwoObjects(usersData);
    });

    await test.step('Check last_name property has expected values for first two data objects', async () => {
      usersSteps.validateLastNameExistsInDataObjects(usersData);
    })
  });

  test('Test data types in GET users endpoint response', async () => {
    await test.step('Get users data on page two ', async () => {
      usersData = await usersSteps.getUsersDataOnPageTwo();
    });

    await test.step('Check properties data types in GET users endpoint response', async () => {
      usersSteps.validateResponsePropertiesTypes(usersData);
    })
  });

  testData.forEach(object => {
    test('Test POST user endpoint for name: ' + object.name , async () => {
      await test.step('Post user data to POST user endpoint for name: ' + object.name, async () => {
        postUsersResponseData = await usersSteps.postUserData(object);
            });
    test.step('Check id property is defined in POST user endpoint response for name: ' + object.name, async () => {
      usersSteps.validateIDPropertyIdDefined(postUsersResponseData);
    })

    test.step('Check createdAt property is defined in POST user endpoint response for name: ' + object.name, async () => {
      usersSteps.validateCreatedAtPropertyIsDefined(postUsersResponseData);
    })

    test.step('Check structure with types for POST user endpoint response' + object.name, async () => {
      usersSteps.validateResponseStructure(postUsersResponseData);
    })
  });
  })

  // Its not assertion, but it will fail the test if response time is more than expected
  // test.setTimeout(100)
  test('Test POST user endpoint response time', async () => {
    const requestBody = testData[0]
    let postResponseTime: number;
    const maxAllowedTime = 100; 

    await test.step('Post user data to POST user endpoint and measure response time', async () => {
      const startTime = Date.now();
      await usersSteps.postUserData(requestBody);
      const endTime = Date.now();
      postResponseTime = endTime - startTime;
      expect(postResponseTime).toBeLessThanOrEqual(maxAllowedTime);
    });
  })
});
