import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import History from "@tiptap/extension-history";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import { lowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import "highlight.js/styles/github-dark.css";
// 自定义的编辑器扩展
import Brick from "../tiptap_extensions/Brick.js";
import Banner from "../tiptap_extensions/Banner.js";
import OfficialLink from "../tiptap_extensions/OfficialLink.js";

let Extensions = [
    Banner,
    Link.configure({
        HTMLAttributes: {
            target: "_blank",
        },
    }),
    OfficialLink,
    Document,
    Text,
    History,
    Heading,
    Paragraph.configure({
        HTMLAttributes: {
            // class: "my-0 py-0",
            // style: "margin:1rem",
        },
    }),
    Bold,
    // FloatingMenu,
    // BubbleMenu,
    Brick,
    ListItem.configure({
        HTMLAttributes: {
            class: "m-0 p-0",
        },
    }),
    BulletList.configure({
        HTMLAttributes: {
            class: "m-0 p-0",
        },
    }),
    CodeBlockLowlight.configure({
        lowlight,
    }),
];

export default Extensions