import { join } from "path";
import Config from "../config";
import DatabaseApi from "./DatabaseApi";

const ShopNodeAPi = new DatabaseApi(join(Config.DATABASE_PATH, 'shop.db'))
 
export default ShopNodeAPi