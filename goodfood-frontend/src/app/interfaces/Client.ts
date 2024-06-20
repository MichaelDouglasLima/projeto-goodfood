import { Product } from "./Product";
import { User } from "./User";

export interface Client {
    id: number;
    height: number;
    weight: number;
    user: User;
    // products: Product[];
}