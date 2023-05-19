import { join } from "path";
import DatabaseApi from "./DatabaseApi";
import { app } from "electron";

const databaseFile = join(app.getPath('userData'), 'local.db')
const NodeModel = new DatabaseApi(databaseFile)

export default NodeModel