import { Category } from "./Category";
import { Meal } from "./Meal";
import { Product } from "./Product";
import { Uniti } from "./enums/Uniti";

export interface MealProduct {
    id: number;
    quantity: number;
    unit: Uniti;
    description: string;
    calories: number;
    category: Category;
    meal: Meal;
    //product: Product;
}