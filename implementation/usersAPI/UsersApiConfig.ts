
import config from '../configProperties.json';

export class UsersAPI {
	private baseUrl: string;
	private usersEndpoint: string;

	constructor() {
		this.baseUrl = config.baseStageUrl;
		this.usersEndpoint = config.usersApi.getUsers;
	}

	usersUrl(): string {
		return this.baseUrl + this.usersEndpoint;
	}
}
