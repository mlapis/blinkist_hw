<template>
  <AbContentBlocks />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AbContentBlocks from "./components/AbContentBlocks.vue";

export default defineComponent({
  name: "App",
  components: {
    AbContentBlocks,
  },
});
</script>
