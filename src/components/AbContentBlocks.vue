<template>
  <div v-for="block in blocks" :key="block.id">
    <div
      v-html="block.variants[block.chosenVariant]"
      @click="trackSuccess($event)"
    ></div>
  </div>
</template>

<script lang="ts">
import { trackPageview, trackEvent } from "../analytics-api";
import { defineComponent } from "vue";
import { useCookie } from "vue-cookie-next";

interface Block {
  variants: string[];
  chosenVariant?: number;
  chances: number[];
  id: number;
}

export default defineComponent({
  props: {
    fetchData: {
      type: Function,
      default: () => [],
    },
  },
  data() {
    return {
      blocks: [] as Block[],
      chosenVariants: [] as number[],
    };
  },
  setup() {
    const { setCookie, getCookie } = useCookie();
    return { setCookie, getCookie };
  },
  async created() {
    this.blocks = await this.fetchData();
    this.setChosenVariants();
    trackPageview({ url: location.href, chosenVariants: this.chosenVariants });
  },
  methods: {
    setChosenVariants() {
      this.chosenVariants = JSON.parse(this.getCookie("chosenVariants")) || [];
      if (this.chosenVariants.length === 0) {
        this.chosenVariants = this.blocks.map((block) => {
          return this.pickRandomChosenVariant(block);
        });
        this.setCookie("chosenVariants", JSON.stringify(this.chosenVariants));
      } else {
        this.chosenVariants.map((element, index) => {
          this.blocks[index].chosenVariant = element;
        });
      }
    },
    pickRandomChosenVariant(block: Block): number {
      const totalProbability = block.chances.reduce((acc, val) => acc + val, 0);
      let randomNum = Math.random() * totalProbability;
      let selectedElement = -1;

      block.chances.some((chance, index) => {
        if (randomNum < chance) {
          selectedElement = index;
          return true;
        }
        randomNum -= chance;
        return false;
      });

      block.chosenVariant = selectedElement;
      return selectedElement;
    },
    trackSuccess(event: Event) {
      if (event && event.target) {
        if ((event.target as HTMLElement).tagName === "A") {
          trackEvent({
            url: location.href,
            chosenVariants: this.chosenVariants,
            event: "clickthrough",
          });
        }
      }
    },
  },
});
</script>
