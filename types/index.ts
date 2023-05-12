export interface WindowSize {
    width: number;
    height: number;
}

export interface IUser {
    _id?: string;
    companyName : string,
    firstName : string,
    lastName : string,
    jobTitle : string,
    industry : string,
    email: string;
    
}

export interface LoginUserParams {
    email: string;
    password: string;
}