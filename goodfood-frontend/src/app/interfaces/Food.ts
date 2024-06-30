import { Category } from "./Category";
import { User } from "./User";
import { Unit } from "./enums/Unit";

export interface Food {
    id: number;
    description: string;
    calories: number;
    category: Category;
    user: User;
    unit: Unit;
    quantity: number;
}