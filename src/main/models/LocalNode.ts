
import { join } from "path";
import Config from "../config";
import { Node, NodeDB } from "./BaseNode";

const db = require('better-sqlite3')(join(Config.DATABASE_PATH, 'local.db'));

const LocalNodeDB = new NodeDB(db);

class LocalNode extends Node {

}

export { LocalNode, LocalNodeDB }