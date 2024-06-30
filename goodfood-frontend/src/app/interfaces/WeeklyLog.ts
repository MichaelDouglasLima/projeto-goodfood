import { Diet } from "./Diet";

export interface WeeklyLog {
    id: number;
    rating: number;
    weight: number;
    endDate: string;
    description: string;
    diet: Diet;
}