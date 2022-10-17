<template>
  <div class="justify-center flex p-0">
    <ul class="flex flex-row justify-center">
      <li class="flex justify-center">
        <div class="dropdown dropdown-top flex justify-center">
          <label tabindex="0" class="btn btn-sm rounded-none self-center">图书</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 h-96 overflow-scroll">
            <li v-for="child in root.children">
              <router-link v-bind:to="child.link" active-class="active">{{ child.title }}</router-link>
            </li>
          </ul>
        </div>
      </li>
      <li v-for="item in items" class="flex justify-center">
        <div class="dropdown dropdown-top flex justify-center" v-if="item.children.length > 0">
          <label tabindex="0" class="btn btn-sm rounded-none self-center">{{ item.title }}</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 h-96 overflow-scroll">
            <li v-for="child in item.children">
              <router-link v-bind:to="child.link" active-class="active">{{ child.title }}</router-link>
            </li>
          </ul>
        </div>
        <div class="dropdown dropdown-top flex justify-center" v-else>
          <label tabindex="0" class="btn btn-sm btn-disabled rounded-none self-center">{{ item.title }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import ArrowRightCircle from "../icons/arrow-right-circle.vue";

export default defineComponent({
  computed: {
    root() {
      return store.navigators;
    },
    items() {
      return store.navigators.getActivatedChildren(this.$route.path);
    },
  },
  components: { ArrowRightCircle },
});
</script>
