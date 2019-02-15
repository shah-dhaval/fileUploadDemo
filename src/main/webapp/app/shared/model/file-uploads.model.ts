import { IUserFiles } from 'app/shared/model/user-files.model';

export interface IFileUploads {
    id?: number;
    fileName?: string;
    fileDataContentType?: string;
    fileData?: any;
    userFiles?: IUserFiles;
}

export class FileUploads implements IFileUploads {
    constructor(
        public id?: number,
        public fileName?: string,
        public fileDataContentType?: string,
        public fileData?: any,
        public userFiles?: IUserFiles
    ) {}
}
