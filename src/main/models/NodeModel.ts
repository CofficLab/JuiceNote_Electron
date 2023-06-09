import { join } from "path";
import Config from "./Config";
import { DatabaseApi, NodeObject } from "./DatabaseApi";

const LocalTree: NodeObject = {
    title: '本地',
    isRoot: true,
    content: '本地节点',
    slug:'local',
    id: 0,
    parentId: 0,
    priority: 0,
    isVisible: true,
    isEmpty: false,
    isPage: false,
    isChapter: false
}

function makeNodeModel() {
    return new DatabaseApi(join(Config.getPreferences().databasePath, 'local.db'))
}

export {
    LocalTree,
    makeNodeModel
}