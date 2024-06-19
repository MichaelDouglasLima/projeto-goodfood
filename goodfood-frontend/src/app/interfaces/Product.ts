import { Category } from "./Category";

export interface Product {
    id: number;
    description: string;
    calories: number;
    category: Category;
    // client: Clients[];
}