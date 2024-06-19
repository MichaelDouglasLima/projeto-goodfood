import { NutritionistClient } from "./NutritionistClient";

export interface Diet {
    id: number;
    dietType: string;
    startDate: string;
    endDate: string;
    dietStatus: number;
    totalMeals: number;
    nutritionistClient: NutritionistClient;
}