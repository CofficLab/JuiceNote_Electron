import { join } from "path";
import DatabaseApi from "./DatabaseApi";
import { app } from "electron";

export default function makeNodeModel() {
    return new DatabaseApi(join(app.getPath('userData'), 'local.db'))
}