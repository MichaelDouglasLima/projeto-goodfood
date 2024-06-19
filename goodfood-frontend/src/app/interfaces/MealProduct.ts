import { Meal } from "./Meal";
import { Product } from "./Product";

export interface MealProduct {
    id: number;
    quantity: number;
    meal: Meal;
    product: Product;
}