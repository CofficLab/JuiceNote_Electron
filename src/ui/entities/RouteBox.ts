import { RouteLocationNormalizedLoaded, RouterLink, useRoute } from "vue-router";
import Node from "./Node";

class RouteBox {
    public route: RouteLocationNormalizedLoaded

    public constructor(route: RouteLocationNormalizedLoaded) {
        this.route = route
    }

    static isHome(route: RouteLocationNormalizedLoaded) {
        return route.name == 'home.show' || route.name == 'home.edit'
    }

    static isLesson(route: RouteLocationNormalizedLoaded) {
        return route.name == 'lessons.show' || route.name == 'lessons.edit'
    }

    static isEditable(route: RouteLocationNormalizedLoaded) {
        return route.name == 'lessons.edit'
    }

    static isAsideVisible(route: RouteLocationNormalizedLoaded) {
        return ["lessons.show", "lessons.edit"].includes(route.name?.toString()!)
    }

    static isHeaderVisible(route: RouteLocationNormalizedLoaded) {
        if (route.name == "lessons.edit") {
            return RouteBox.getCurrentNode(route)!.isChapter;
        }

        return ["lessons.show", "home.show", "home.edit"].includes(route.name?.toString()!);
    }

    static getCurrentNode(route: RouteLocationNormalizedLoaded) {
        if (this.isLesson(route)) {
            return Node.find(route.params.id.toString())
        }

        return null
    }

    static getCurrentBook(route: RouteLocationNormalizedLoaded) {
        if (this.isLesson(route)) {
            return Node.find(route.params.id.toString()).getBook()
        }

        return null
    }

    static getBreadcrumbs(route: RouteLocationNormalizedLoaded) {
        let current = RouteBox.getCurrentNode(route)
        return current!.getParents().concat([current!])
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

    public getBreadcrumbs() {
        return RouteBox.getBreadcrumbs(this.route)
    }
}

export default RouteBox