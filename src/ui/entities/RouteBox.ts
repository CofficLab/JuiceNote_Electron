import { RouteLocationNormalizedLoaded, Router, RouterLink, useRoute, useRouter } from "vue-router";
import { Node } from "./Node";
import  NodeApi  from "../api/NodeApi";

class RouteBox {
    public route: RouteLocationNormalizedLoaded

    public constructor(route: RouteLocationNormalizedLoaded) {
        this.route = route
    }

    static isHome(route: RouteLocationNormalizedLoaded) {
        return route.name == 'home.show' || route.name == 'home.edit'
    }

    static isLesson(route: RouteLocationNormalizedLoaded) {
        return route.name == 'nodes.show' || route.name == 'local.lessons.edit' || route.name == 'shop.lessons.show' || route.name == 'shop.lessons.edit'
    }

    static isShop(route: RouteLocationNormalizedLoaded) {
        return route.fullPath.includes('/shop/')
    }

    static isDatabase(route: RouteLocationNormalizedLoaded) {
        return route.name == 'database'
    }

    static isEditable(route: RouteLocationNormalizedLoaded) {
        return route.name == 'lessons.edit'
    }

    static isAsideVisible(route: RouteLocationNormalizedLoaded) {
        return ["nodes.show", "lessons.edit"].includes(route.name?.toString()!)
    }

    static isHeaderVisible(route: RouteLocationNormalizedLoaded) {
        if (route.name == "lessons.edit") {
            return RouteBox.getCurrentNode(route)!.isChapter;
        }

        return ["nodes.show", "home.show", "home.edit"].includes(route.name?.toString()!);
    }

    static isActive(route: RouteLocationNormalizedLoaded, node: Node) {
        let current = RouteBox.getCurrentNode(route);

        if (node.isPage) return current!.id == node.id;

        if (node.isTab)
            return current!.getParents().some((parent) => {
                return parent.id == node.id;
            });

        if (node.isChapter && node.getChildren().length == 0) return current!.id == node.id;

        return false;
    }

    static getCurrentNode(route: RouteLocationNormalizedLoaded) {
        if (this.isLesson(route)) {
            return NodeApi.find(route.params.id.toString())
        }

        return null
    }

    static getSubMenus(route: RouteLocationNormalizedLoaded, node: Node) {
        let current = RouteBox.getCurrentNode(route)
        let editable = RouteBox.isEditable(route)

        if (node.isBook && node.getTabs().length > 0) {
            return current!.getFirstTabInParents()?.getChildren();
        }

        return editable ? node.getChildren() : node.getVisibleChildren();
    };

    static getCurrentBook(route: RouteLocationNormalizedLoaded) {
        if (this.isLesson(route)) {
            return NodeApi.find(route.params.id.toString()).getBook()
        }

        return null
    }

    static goto(router: Router, node: Node) {
        router.push({ name: 'nodes.show', params: { id: node.id } })
    }

    public isHome() {
        return RouteBox.isHome(this.route)
    }

    public isLesson() {
        return RouteBox.isLesson(this.route)
    }

    public isEditable() {
        return RouteBox.isEditable(this.route)
    }

    public isAsideVisible() {
        return RouteBox.isAsideVisible(this.route)
    }

    public isHeaderVisible() {
        return RouteBox.isHeaderVisible(this.route)
    }

    public getCurrentNode() {
        return RouteBox.getCurrentNode(this.route)
    }

    public getCurrentBook() {
        return RouteBox.getCurrentBook(this.route)
    }
}

export default RouteBox