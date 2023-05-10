
import { join } from "path";
import Config from "../config";
import { Node } from "./BaseNode";

const db = require('better-sqlite3')(join(Config.DATABASE_PATH, 'local.db'));

export default Node.new(db);