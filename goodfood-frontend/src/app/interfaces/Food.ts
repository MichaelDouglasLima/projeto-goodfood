import { Category } from "./Category";
import { User } from "./User";

export interface Food {
    id: number;
    description: string;
    calories: number;
    category: Category;
    user: User;
}