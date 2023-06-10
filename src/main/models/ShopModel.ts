import { join } from "path";
import { DatabaseApi, NodeObject } from "./DatabaseApi";
import Config from "./Config";

const ShopTree: NodeObject = {
    title: '商店',
    isRoot: true,
    slug:"shop",
    content: '商店节点',
    id: 0,
    parentId: 0,
    priority: 0,
    isVisible: true,
    isEmpty: false,
    isPage: false,
    isChapter:false
}

function makeShopModel() {
    return new DatabaseApi(join(Config.User_Data_Path, 'shop.db'))
}

export {
    ShopTree,
    makeShopModel
}