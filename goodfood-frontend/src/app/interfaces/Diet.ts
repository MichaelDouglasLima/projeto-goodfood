import { NutritionistClient } from "./NutritionistClient";
import { User } from "./User";
import { DietStatus } from "./enums/DietStatus";

export interface Diet {
    id?: number;
    dietType: string;
    startDate: string;
    endDate?: string;
    status?: DietStatus;
    totalMeals: number;
    observation: string;
    client: User;
    nutritionist: User;
}