import { join } from "path";
import Config from "../config";
import { Base } from "./BaseNode";

export default class LocalNode extends Base {
    constructor() {
        super(join(Config.DATABASE_PATH, 'local.db'))
    }
}