import { join } from "path";
import DatabaseApi from "./DatabaseApi";
import Config from "./Config";

export default function makeNodeModel() {
    return new DatabaseApi(join(Config.getPreferences().databasePath, 'local.db'))
}