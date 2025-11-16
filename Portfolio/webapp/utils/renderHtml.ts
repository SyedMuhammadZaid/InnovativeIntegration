import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";

export function renderTiptapContent(json: any) {
    const wrappedJson = Array.isArray(json)
        ? { type: "doc", content: json }
        : json;

    return generateHTML(wrappedJson, [
        StarterKit.configure({
            bulletList: false,
            orderedList: false,
            heading: false,
        }),
        Color,
        TextStyle,
        Image,
        Heading.configure({ levels: [1, 2, 3] }),
        BulletList,
        OrderedList,
        ListItem,
        Link,
    ]);
}
