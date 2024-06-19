import { Nutritionist } from "./Nutritionist";
import { Client } from "./Client";

export interface NutritionistClient {
    id: number;
    nutritionist: Nutritionist;
    client: Client;
}