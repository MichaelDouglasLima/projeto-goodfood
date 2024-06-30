import { Diet } from "./Diet";
import { Period } from "./enums/Period";

export interface Meal {
    id: number;
    estimatedTime: string;
    comment: string;
    period: Period;
    diet: Diet;
}