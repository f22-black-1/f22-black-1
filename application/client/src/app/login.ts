export class Login {
  constructor(
  public Username: string,
  public Password: string,
  ) {}
  
}

//signed-in user profile for test purposes
export class CurrentUser {
  userid: string;
  username: string;
}