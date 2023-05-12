import { join } from "path";
import Config from "../config";
import DatabaseApi from "./DatabaseApi";

const LocalNodeDatabaseApi = new DatabaseApi(join(Config.DATABASE_PATH, 'local.db'))

export default LocalNodeDatabaseApi