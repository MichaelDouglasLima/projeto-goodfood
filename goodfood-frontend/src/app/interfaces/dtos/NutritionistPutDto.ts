import { UserPutDto } from "./UserPutDto";

export interface NutritionistPutDto {
  cfn: string;
  user: UserPutDto;
}
