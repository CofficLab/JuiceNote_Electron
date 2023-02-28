import Highlight from "@tiptap/extension-highlight";

const Brick = Highlight.extend({
  name: "brick",
  addAttributes() {
    return {
      color: {
        default: null,
        // Customize the HTML parsing (for example, to load the initial content)
        parseHTML: (element) => element.getAttribute("class"),
        // … and customize the HTML rendering.
        renderHTML: (attributes) => {
          return {
            class: "brick",
          };
        },
      },
    };
  },
  addCommands() {
    return {
      setBrick:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      unsetBrick:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
      toggleBrick:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
    };
  },
});

export default Brick;
