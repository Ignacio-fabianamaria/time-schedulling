import { int } from "aws-sdk/clients/datapipeline";

export interface ICreate {
    name: string;
    email: string;
    password: string;

}

export interface IUpdate {
    name: string
    oldPassword: string
    newPassword: string
    avatar_url?: IFileUpload
}

interface IFileUpload{
    fieldname:string,
    originalname:string,
    encoding:string,
    mimetype:string,
    buffer:Buffer,
    size: number
}