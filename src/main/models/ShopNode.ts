
import { join } from "path";
import Config from "../config";
import { Node } from "./BaseNode";

const db = require('better-sqlite3')(join(Config.DATABASE_PATH, 'database.db'));

export default class ShopNode extends Node {

}