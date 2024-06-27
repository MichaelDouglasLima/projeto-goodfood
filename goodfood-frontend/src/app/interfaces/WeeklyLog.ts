import { Diet } from "./Diet";
import { User } from "./User";

export interface WeeklyLog {
    id: number;
    rating: number;
    weight: number;
    endDate: string;
    description: string;
    diet: Diet;
    // user: User;
}