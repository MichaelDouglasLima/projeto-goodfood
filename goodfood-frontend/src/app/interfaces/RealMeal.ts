import { Diet } from "./Diet";
import { Period } from "./enums/Period";

export interface RealMeal {
    id: number;
    period: Period;
    registerDate: string;
    registerTime: string;
    followedDiet: boolean;
    comment: string;
    diet: Diet;
}