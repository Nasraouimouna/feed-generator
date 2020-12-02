import { IUser } from './user.model';
export interface ICustomer {
    _id?: string;
    fullname: string;
    adress: string;
    city: string;
    isLicenced? : boolean;
    logo_url?: string;
    users?:  IUser [];
}