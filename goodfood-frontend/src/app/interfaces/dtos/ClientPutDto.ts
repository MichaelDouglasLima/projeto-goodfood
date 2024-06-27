import { UserPutDto } from "./UserPutDto";

export interface ClientPutDto {
  height: number;
  weight: number;
  user: UserPutDto;
}
