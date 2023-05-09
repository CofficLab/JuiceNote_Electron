
import { join } from "path";
import Config from "../config";
import { Node, NodeDB } from "./BaseNode";

const db = require('better-sqlite3')(join(Config.DATABASE_PATH, 'shop.db'));

const ShopNodeDB = new NodeDB(db);

class ShopNode extends Node {

}

export {
    ShopNode,
    ShopNodeDB
}