<template>
  <div
    class="justify-center flex flex-grow p-0 breadcrumbs overflow-visible"
    v-bind:class="inEditMode ? 'text-yellow-500' : ''"
  >
    <ul class="flex flex-row justify-center">
      <li v-for="breadcrumb in breadcrumbs" class="flex justify-center">
        <div class="dropdown dropdown-top flex justify-center" v-if="breadcrumb.children.length > 0">
          <label tabindex="0" class="self-center">{{ breadcrumb.title }}</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 h-96 overflow-scroll">
            <li
              v-for="child in breadcrumb.children"
              draggable="true"
              v-on:dragend="dragEnd()"
              v-on:dragstart="dragStart(child)"
              v-on:dragenter="dragEnter(child)"
              class="flex flex-row min-w-fit"
            >
              <div class="bg-base-content w-full p-0" v-bind:class="child === hovered ? 'h-4' : ''"></div>
              <router-link v-bind:to="child.link" active-class="active">
                <span v-text="child.getParent()?.findKey(child.id)"></span>
                <span>{{ child.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="dropdown dropdown-top flex justify-center" v-else>
          <label tabindex="0" class="rounded-none self-center">{{ breadcrumb.title }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import ArrowRightCircle from "../icons/arrow-right-circle.vue";
import Address from "./Address.vue";

export default defineComponent({
  data() {
    return {
      dragged: null,
      hovered: null,
    };
  },
  computed: {
    breadcrumbs() {
      // console.log("root is", store.getRootNavigator());
      console.log("get breadcrumbs,current path is", this.$route.path);
      let breadcrumbs = store.getRootNavigator().getActivated(this.$route.path);
      console.log("breadcrumbs", breadcrumbs);

      return breadcrumbs;
    },
    inEditMode(): boolean {
      return store.edit_mode;
    },
  },
  methods: {
    dragStart(navigator) {
      this.dragged = navigator;
    },
    dragEnd() {
      let newOrder = this.dragged.getParent().findKey(this.hovered.id);
      store.updateOrder(this.dragged, newOrder);
      this.hovered = null;
    },
    dragEnter(navigator) {
      this.hovered = navigator;
    },
  },
  components: { ArrowRightCircle, Address },
});
</script>
