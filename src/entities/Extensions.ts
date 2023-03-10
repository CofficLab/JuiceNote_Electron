import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import History from "@tiptap/extension-history";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Gapcursor from '@tiptap/extension-gapcursor'
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import HardBreak from '@tiptap/extension-hard-break'
import Brick from "../views/extensions/Brick.js";
import Banner from "../views/extensions/Banner.js";
import OfficialLink from "../views/extensions/OfficialLink.js";
import Toc from "../views/extensions/Toc.js"
import Tab from "../views/extensions/Tab.js"
import TabContent from "../views/extensions/TabContent.js"
import CodeBlockCustomized from "../views/extensions/CodeBlockCustomized.js"

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
    Document,
    Gapcursor,
    HardBreak,
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
    // Tab,
    // TabContent,
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