
import { expect } from '@playwright/test';
import { UsersApiClient } from './UsersApi';
import { GetUsersResponseDTO, PostUserResponseDTO } from './UsersApi.dto';
import { UsersExpected } from './UsersApi.expected';

// I would go even one level deeper and create test helpers methods in its own class to have for example: 
// error messages under control and in one place (can be used for custom reporter later on)
// but for the sake of this example I will keep it here
// This class will contain methods to perform API calls and validate responses
export class UsersApiResponseSteps {
  private client: UsersApiClient;
  usersExpected = new UsersExpected();

  constructor(client: UsersApiClient) {
    this.client = client;
  }

  getUsersDataOnPageTwo = async () => {
    const response = await this.client.getUsersOnPage('2');
    expect(response.status()).toBe(200);
    const data = await response.json();
    return data;
  }

  validateTotalPropertyIsDefined = (usersData: GetUsersResponseDTO) => {
    expect(usersData.total).toBeDefined();
  }

  validateLastNamePropertyIsDefinedForFirstTwoObjects = (usersData: GetUsersResponseDTO) => {
    const users = usersData.data.slice(0,2);
    for (const user of users) {
      expect(user.last_name).toBeDefined();
    }
  }

  validateTotalPropertyValue = (usersData: GetUsersResponseDTO, value: number) => {
    expect(usersData.total).toBe(value);
  }

  validateResponsePropertiesTypes = (usersData: GetUsersResponseDTO) => {
    expect(usersData).toMatchObject(this.usersExpected.getUsersResponse);
  }

  validateLastNameExistsInDataObjects = (usersData: GetUsersResponseDTO) => {
    const expectedLastNames = ["Lawson", "Ferguson"];
    const users = usersData.data.slice(0,2);
    users.forEach((user, index) => {
      expect(user.last_name).toBe(expectedLastNames[index]);
    });
  }

  postUserData = async (requestBody: object) => {
    const response = await this.client.postUser(requestBody);
    expect(response.status()).toBe(201);
    const data = await response.json();
    console.log('POST User Response Data:', data);
    return data;
  }

  validateIDPropertyIdDefined = (postUserData: PostUserResponseDTO) => {
    expect(postUserData.id).toBeDefined();
  }

  validateCreatedAtPropertyIsDefined = (postUserData: PostUserResponseDTO) => {
    expect(postUserData.createdAt).toBeDefined();
  }

  // Soft validation to check the overall structure of the response 
  // If any property is added it will pass
  validateResponseStructure = (postUserData: PostUserResponseDTO) => {
    expect(postUserData).toMatchObject(this.usersExpected.postUserResponse);
  }
}
