
import { APIRequestContext } from '@playwright/test';
import { UsersAPI } from '../../implementation/usersAPI/UsersApiConfig';

export class UsersApiClient {
	private usersApi: UsersAPI;
	private apiRequestContext: APIRequestContext;

	constructor(apiRequestContext: APIRequestContext) {
		this.usersApi = new UsersAPI();
		this.apiRequestContext = apiRequestContext;
	}

	getUsersOnPage = async (page: string = '2') => {
		const url = this.usersApi.usersUrl();
		const response = await this.apiRequestContext.get(url, {
			params: {
				page: page
			}
		});
		return response;
	}

	postUser = async (requestBody: object) => {
		const url = this.usersApi.usersUrl();
		const response = await this.apiRequestContext.post(url, {
			data: requestBody
		});
		return response;
	}
}