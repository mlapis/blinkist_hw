<template>
  <AbContentBlocks :fetchData="fetchData" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AbContentBlocks from "./components/AbContentBlocks.vue";

export default defineComponent({
  name: "App",
  components: {
    AbContentBlocks,
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("http://localhost:3000/blocks");
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
