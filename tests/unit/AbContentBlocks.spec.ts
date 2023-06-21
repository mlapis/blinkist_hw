import {render, screen} from '@testing-library/vue'
import AbContentBlocks from "@/components/AbContentBlocks.vue";

interface Block {
  variants: string[];
  chosenVariant?: number;
  chances: number[];
  id: number;
}

describe("AbContentBlocks.vue", () => {
  it("renders blocks according to chances", () => {
    const fetchData: () => Block[] = () => {
      return [
        {
          variants: [
            "Never first",
            "Always second",
          ],
          chances: [0, 100],
          id: 1,
        },
      ];
    };
    render(AbContentBlocks, {
      props: {
        fetchData: fetchData
      }
    });
    screen.getByText("Always second");
    expect(() => screen.getByText("Never first")).toThrow()
  });

  it("allows multiple blocks to be rendered", () => {
    const fetchData: () => Block[] = () => {
      return [
        {
          variants: [
            "First",
          ],
          chances: [100],
          id: 1,
        },
        {
          variants: [
            "Second",
          ],
          chances: [100],
          id: 2,
        },
      ];
    };
    render(AbContentBlocks, {
      props: {
        fetchData: fetchData
      }
    });
    screen.getByText("First");
    screen.getByText("Second");
  });
});
