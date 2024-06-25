import { User } from "./User";

export interface Request {
    id?: number;
    client: User;
    nutritionist: User;
}