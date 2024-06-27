import { Gender } from "../enums/Gender";

export interface UserPutDto {
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  gender: Gender;
  description: string;
}
