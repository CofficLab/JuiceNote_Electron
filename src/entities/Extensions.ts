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
import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import "highlight.js/styles/github-dark.css";
// 自定义的编辑器扩展
import Brick from "../extensions/Brick.js";
import Banner from "../extensions/Banner.js";
import OfficialLink from "../extensions/OfficialLink.js";
import Toc from "../extensions/Toc.js"
import Tab from "../extensions/Tab.js"
import CodeBlockCustomized from "../extensions/CodeBlockCustomized.js"

let Extensions = [
    Banner,
    Bold,
    BulletList.configure({
        HTMLAttributes: {
            class: "m-0 p-0",
        },
    }),
    // FloatingMenu,
    // BubbleMenu,
    Brick,
    CodeBlockCustomized,
    CodeBlockLowlight.configure({
        lowlight,
    }),
    Document,
    History,
    Heading,
    ListItem.configure({
        HTMLAttributes: {
            class: "m-0 p-0",
        },
    }),
    Link.configure({
        HTMLAttributes: {
            target: "_blank",
        },
    }),
    OfficialLink,
    Paragraph.configure({
        HTMLAttributes: {
            // class: "my-0 py-0",
            // style: "margin:1rem",
        },
    }),
    Tab,
    Text,
    TableCell.configure({
        HTMLAttributes: {
            class: 'border-2 border-sky-300'
        }
    }),
    TableRow.configure({
        HTMLAttributes: {
            class: 'border-2 border-red-300'
        }
    }),
    TableHeader,
    Table.configure({
        HTMLAttributes: {
            class: 'table bg-cyan-500/30 table-zebra',
        },
    }),
    Toc
];

export default Extensions