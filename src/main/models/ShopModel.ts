import { join } from "path";
import DatabaseApi from "./DatabaseApi";
import Config from "./Config";

export default function makeShopModel() {
    return new DatabaseApi(join(Config.DATABASE_PATH, 'shop.db'))
}