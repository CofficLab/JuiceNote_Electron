<template>
  <div
    class="justify-center h-full flex flex-grow p-0 breadcrumbs overflow-visible bg-gradient-to-r from-sky-200/60 via-sky-200/90 to-sky-200/60 dark:from-sky-800/80 dark:via-sky-900 dark:to-sky-800/80"
    v-bind:class="{ 'text-yellow-500': inEditMode }"
  >
    <ul class="flex flex-row justify-center">
      <li v-for="breadcrumb in breadcrumbs" class="flex justify-center">
        <div class="dropdown dropdown-top flex justify-center" v-if="breadcrumb.siblings().length > 0">
          <label tabindex="0" class="self-center">{{ breadcrumb.name }}</label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 h-96 mt-8 overflow-scroll"
          >
            <li
              v-for="(item, index) in breadcrumb.siblings()"
              draggable="true"
              v-on:dragend="dragEnd()"
              v-on:dragstart="dragStart(item)"
              v-on:dragenter="dragEnter(item, index)"
              class="flex flex-row min-w-fit"
            >
              <!-- 拖移时显示 -->
              <div
                class="w-full mx-0 min-w-fit overflow-hidden"
                v-bind:class="hovered != null && item.id == hovered.id ? 'h-12 py-6 px-0' : 'h-0 py-0 px-0'"
              >
                <div class="bg-base-content/10 w-full h-12 rounded"></div>
              </div>

              <Link
                v-bind:href="item.id"
                v-bind:class="{
                  active: item.isActivated(),
                  'hover:bg-transparent': dragged !== emptyNode,
                }"
              >
                <span>{{ item.name }}</span>
              </Link>
            </li>

            <li
              draggable="true"
              v-on:dragend="dragEnd()"
              v-on:dragenter="dragEnter(bottomNode)"
              class="flex flex-row min-w-fit"
            >
              <!-- 拖移时显示 -->
              <div class="w-full px-0 h-0" v-bind:class="bottomNode !== hovered ? '' : 'bg-base-content/10 h-12'"></div>
            </li>
          </ul>
        </div>
        <div class="dropdown dropdown-top flex justify-center" v-else>
          <label tabindex="0" class="rounded-none self-center">{{ breadcrumb.name }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Link from "./Link.vue";
import RouteController from "../controllers/RouteController";
import EditModeController from "../controllers/EditModeController";
import OrderController from "../controllers/OrderController";
import BookNode from "../entities/BookNode";

export default defineComponent({
  data() {
    let emptyNode = new BookNode();
    let bottomNode = new BookNode("/dev/null");
    return {
      dragged: emptyNode,
      hovered: emptyNode,
      emptyNode: emptyNode,
      bottomNode: bottomNode,
      index: 0,
    };
  },
  computed: {
    breadcrumbs() {
      console.log("Breadcrumbs.vue", "获取breadcrumbs");
      let breadcrumbs = RouteController.getBreadcrumbs();

      return breadcrumbs;
    },
    inEditMode(): boolean {
      return EditModeController.edit_mode;
    },
  },
  methods: {
    dragStart(navigator: BookNode) {
      this.dragged = navigator;
    },
    dragEnd() {
      RouteController.goto(this.dragged.parent().id);
      OrderController.updateOrder(this.dragged, this.index);
      this.hovered = null;
    },
    dragEnter(navigator: BookNode, index) {
      this.hovered = navigator;
      this.index = index;
    },
  },
  components: { Link },
});
</script>
