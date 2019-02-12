import { IUser } from 'app/core/user/user.model';

export interface IUserFiles {
    id?: number;
    title?: string;
    description?: string;
    user?: IUser;
}

export class UserFiles implements IUserFiles {
    constructor(public id?: number, public title?: string, public description?: string, public user?: IUser) {}
}
