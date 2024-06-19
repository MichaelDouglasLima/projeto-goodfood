import { Gender } from "./enums/Gender";
import { Role } from "./enums/Role";

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    description: string;
    birthDate: string;
    gender: Gender;
    role: Role;
}