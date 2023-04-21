import Code from '@tiptap/extension-code'
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import History from "@tiptap/extension-history";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Gapcursor from '@tiptap/extension-gapcursor'
import Heading from "@tiptap/extension-heading";
import HorizonRule from '@tiptap/extension-horizontal-rule'
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import HardBreak from '@tiptap/extension-hard-break'
import Italic from '@tiptap/extension-italic'
import OrderList from '@tiptap/extension-ordered-list'
import Strike from '@tiptap/extension-strike'
import Brick from "../ui/extensions/Brick.js";
import Banner from "../ui/extensions/Banner.js";
import BlockQuote from '@tiptap/extension-blockquote'
import OfficialLink from "../ui/extensions/OfficialLink.js";
import Toc from "../ui/extensions/Toc.js"
import Tab from "../ui/extensions/Tab.js"
import TabContent from "../ui/extensions/TabContent.js"
import CodeEditor from "../ui/extensions/CodeEditor.js"
import CodeBlockTab from "../ui/extensions/CodeTab.js"
import Chat from "../ui/extensions/Chat.js"
import TimeLine from "../ui/extensions/TimeLine.js"
import TimeLineTitle from "../ui/extensions/TimeLineTitle.js"

let Extensions = [
    Banner,
    Bold,
    BlockQuote,
    BulletList.configure({
        HTMLAttributes: {
            class: "m-0 p-0",
        },
    }),
    // FloatingMenu,
    // BubbleMenu,
    Brick,
    Code,
    CodeEditor,
    CodeBlockTab,
    Chat,
    Document,
    Gapcursor,
    HardBreak,
    History,
    HorizonRule,
    Heading,
    Italic,
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
    OrderList,
    Paragraph.configure({
        HTMLAttributes: {
            // class: "my-0 py-0",
            // style: "margin:1rem",
        },
    }),
    Strike,
    // Tab,
    // TabContent,
    Text,
    TableCell,
    TableRow,
    TableHeader,
    Table,
    TimeLine,
    TimeLineTitle,
    Toc
];

export default Extensions