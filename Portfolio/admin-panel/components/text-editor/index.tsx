"use client";

import React, { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import useMessage from "@/Utils/hooks/useMessage";

interface RichTextEditorProps {
    content?: any; // JSON for edit mode
    onChange?: (content: any) => void; // JSON output
    onImageUpload?: (file: File) => Promise<string>; // Custom image upload handler that returns URL
    onImageDelete?: (imageUrl: string, fileName?: string) => Promise<string>; // Custom image delete handler
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, onImageUpload, onImageDelete }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { errorMsg, contextHolder } = useMessage()

    // Custom Image extension with delete functionality
    const CustomImage = Image.extend({
        addAttributes() {
            return {
                ...this.parent?.(),
                fileName: {
                    default: null,
                    parseHTML: element => element.getAttribute('data-file-name'),
                    renderHTML: attributes => {
                        if (!attributes.fileName) return {}
                        return { 'data-file-name': attributes.fileName }
                    },
                },
                fileSize: {
                    default: null,
                    parseHTML: element => element.getAttribute('data-file-size'),
                    renderHTML: attributes => {
                        if (!attributes.fileSize) return {}
                        return { 'data-file-size': attributes.fileSize }
                    },
                },
                fileType: {
                    default: null,
                    parseHTML: element => element.getAttribute('data-file-type'),
                    renderHTML: attributes => {
                        if (!attributes.fileType) return {}
                        return { 'data-file-type': attributes.fileType }
                    },
                },
                uploadUrl: {
                    default: null,
                    parseHTML: element => element.getAttribute('data-upload-url'),
                    renderHTML: attributes => {
                        if (!attributes.uploadUrl) return {}
                        return { 'data-upload-url': attributes.uploadUrl }
                    },
                },
            }
        },

        renderHTML({ HTMLAttributes }) {
            const { src, alt, title, fileName, uploadUrl } = HTMLAttributes;

            return [
                'div',
                { class: 'image-wrapper' },
                [
                    'img',
                    {
                        ...HTMLAttributes,
                        class: 'tiptap-image',
                    }
                ],
                [
                    'button',
                    {
                        class: 'image-delete-btn',
                        'data-src': src,
                        'data-upload-url': uploadUrl || src, // Use src as fallback if uploadUrl is not available
                        'data-file-name': fileName,
                        type: 'button',
                        title: 'Delete image'
                    },
                    '×'
                ]
            ];
        },

        parseHTML() {
            return [
                {
                    tag: 'img[src]',
                },
                {
                    tag: 'div.image-wrapper',
                    getAttrs: (element) => {
                        const img = element.querySelector('img');
                        if (!img) return false;

                        return {
                            src: img.getAttribute('src'),
                            alt: img.getAttribute('alt'),
                            title: img.getAttribute('title'),
                            fileName: img.getAttribute('data-file-name'),
                            fileSize: img.getAttribute('data-file-size'),
                            fileType: img.getAttribute('data-file-type'),
                            uploadUrl: img.getAttribute('data-upload-url'),
                        };
                    },
                },
            ];
        },
    });

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
                heading: false, // Disable StarterKit heading to use our custom one
            }),
            Placeholder.configure({ placeholder: "Start typing..." }),
            TextStyle,
            Color,
            CustomImage.configure({
                HTMLAttributes: {
                    class: 'tiptap-image',
                },
            }),
            Heading.configure({
                levels: [1, 2, 3],
                HTMLAttributes: {
                    class: 'tiptap-heading',
                },
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: 'tiptap-bullet-list',
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'tiptap-ordered-list',
                },
            }),
            ListItem.configure({
                HTMLAttributes: {
                    class: 'tiptap-list-item',
                },
            }),
            Link.configure({
                openOnClick: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    class: 'tiptap-link',
                },
            }),
        ],
        content: content || null,
        onUpdate: ({ editor }) => onChange?.(editor.getJSON()),
        editorProps: {
            attributes: {
                class: "tiptap-editor focus:outline-none min-h-[200px] p-3"
            }
        },
        immediatelyRender: false,
    });

    React.useEffect(() => {
        if (editor && content) {
            // ensure the content is a valid TipTap JSON doc
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    // Handle image delete clicks
    React.useEffect(() => {
        if (!editor) return;

        const handleImageDelete = async (event: Event) => {
            const target = event.target as HTMLElement;
            if (!target.classList.contains('image-delete-btn')) return;

            event.preventDefault();
            event.stopPropagation();

            const imageUrl = target.getAttribute('data-src');
            const uploadUrl = target.getAttribute('data-upload-url');
            const fileName = target.getAttribute('data-file-name');

            console.log('Delete clicked - imageUrl:', imageUrl, 'uploadUrl:', uploadUrl);

            if (!imageUrl) return;

            try {
                // Call the delete handler if provided
                // Use uploadUrl if available, otherwise use imageUrl
                const urlToDelete = uploadUrl || imageUrl;
                if (onImageDelete && urlToDelete) {
                    let resp: any = await onImageDelete(urlToDelete, fileName || undefined);
                    if (resp?.success) {
                        // Remove the image from the editor
                        const { state } = editor;
                        const { doc } = state;

                        doc.descendants((node, pos) => {
                            if (node.type.name === 'image' && node.attrs.src === imageUrl) {
                                const tr = state.tr.delete(pos, pos + 1);
                                editor.view.dispatch(tr);
                                return false; // Stop searching
                            }
                        });
                    }
                    else {
                        errorMsg('Failed to delete image')
                    }
                }
            }
            catch (error) {
                console.error('Failed to delete image:', error);
                alert('Failed to delete image. Please try again.');
            }
        };

        const editorElement = editor.view.dom;
        editorElement.addEventListener('click', handleImageDelete);

        return () => {
            editorElement.removeEventListener('click', handleImageDelete);
        };
    }, [editor, onImageDelete]);

    if (!editor) return null;

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            // Show loading state
            const loadingImageSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+";

            // Insert loading placeholder
            editor.chain().focus().setImage({ src: loadingImageSrc }).run();

            let imageUrl: string;

            if (onImageUpload) {
                // Use custom upload handler
                imageUrl = await onImageUpload(file);
            } else {
                // Fallback to base64 if no upload handler provided
                imageUrl = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.readAsDataURL(file);
                });
            }

            // Replace loading image with actual image
            const { state } = editor;
            const { doc } = state;
            let imagePos: number | null = null;

            doc.descendants((node, pos) => {
                if (node.type.name === 'image' && node.attrs.src === loadingImageSrc) {
                    imagePos = pos;
                    return false; // Stop searching
                }
            });

            if (imagePos !== null) {
                // Create image node with metadata using our custom attributes
                const imageNode = editor.schema.nodes.image.create({
                    src: imageUrl,
                    alt: file.name,
                    title: file.name,
                    fileName: file.name,
                    fileSize: file.size.toString(),
                    fileType: file.type,
                    uploadUrl: imageUrl, // Make sure uploadUrl is set to the same as src
                });

                // Replace the loading image
                const tr = state.tr.replaceWith(imagePos, imagePos + 1, imageNode);
                editor.view.dispatch(tr);
            }

        } catch (error) {
            console.error('Image upload failed:', error);
            alert('Image upload failed. Please try again.');

            // Remove loading image on error
            const { state } = editor;
            const { doc } = state;

            doc.descendants((node, pos) => {
                if (node.type.name === 'image' && node.attrs.src.includes('Loading')) {
                    const tr = state.tr.delete(pos, pos + 1);
                    editor.view.dispatch(tr);
                    return false;
                }
            });
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAddLink = () => {
        const urlInput = prompt("Enter link URL");
        if (!urlInput) return;

        let url = urlInput.trim();

        // Auto-add HTTPS if no protocol is provided
        if (!/^https?:\/\//i.test(url)) {
            url = "https://" + url;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url, target: "_blank" })
            .run();
    };

    const handleHeadingChange = (value: string) => {
        if (!editor) return;
        if (value === "0") {
            editor.chain().focus().setParagraph().run();
        } else {
            const level = Number(value) as 1 | 2 | 3;
            editor.chain().focus().setHeading({ level }).run();
        }
    };

    // Enhanced list handling for multiple lines
    const handleBulletList = () => {
        const { from, to } = editor.state.selection;

        // If there's a selection spanning multiple nodes
        if (from !== to) {
            // Get the selected content
            const selectedText = editor.state.doc.textBetween(from, to, '\n');
            const lines = selectedText.split('\n').filter(line => line.trim() !== '');

            if (lines.length > 1) {
                // Create bullet list from multiple lines
                const listItems = lines.map(line => `<li>${line.trim()}</li>`).join('');
                const listHTML = `<ul style="padding-left: 1.5rem">${listItems}</ul>`;

                editor.chain()
                    .focus()
                    .deleteSelection()
                    .insertContent(listHTML)
                    .run();
                return;
            }
        }

        // Default behavior for single line or no selection
        editor.chain().focus().toggleBulletList().run();
    };

    const handleOrderedList = () => {
        const { from, to } = editor.state.selection;

        // If there's a selection spanning multiple nodes
        if (from !== to) {
            // Get the selected content
            const selectedText = editor.state.doc.textBetween(from, to, '\n');
            const lines = selectedText.split('\n').filter(line => line.trim() !== '');

            if (lines.length > 1) {
                // Create ordered list from multiple lines
                const listItems = lines.map(line => `<li>${line.trim()}</li>`).join('');
                const listHTML = `<ol style="padding-left: 1.5rem">${listItems}</ol>`;

                editor.chain()
                    .focus()
                    .deleteSelection()
                    .insertContent(listHTML)
                    .run();
                return;
            }
        }

        // Default behavior for single line or no selection
        editor.chain().focus().toggleOrderedList().run();
    };

    const isActive = (name: string, attributes?: any) => {
        return editor.isActive(name, attributes);
    };

    return (
        <div className="border rounded-md">
            {contextHolder}
            {/* Toolbar */}
            <div className="border-b p-3 flex flex-wrap gap-2 bg-gray-50">
                {/* Bold / Italic */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1 rounded border ${isActive('bold') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1 rounded border ${isActive('italic') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                    <em>I</em>
                </button>

                {/* Headings */}
                <select
                    onChange={(e) => handleHeadingChange(e.target.value)}
                    value={
                        isActive('heading', { level: 1 }) ? '1' :
                            isActive('heading', { level: 2 }) ? '2' :
                                isActive('heading', { level: 3 }) ? '3' : '0'
                    }
                    className="px-2 py-1 rounded border bg-white"
                >
                    <option value="0">Paragraph</option>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>

                {/* Lists */}
                <button
                    type="button"
                    onClick={handleBulletList}
                    className={`px-3 py-1 rounded border ${isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                    title="Bullet List (Select multiple lines for multi-item list)"
                >
                    • List
                </button>
                <button
                    type="button"
                    onClick={handleOrderedList}
                    className={`px-3 py-1 rounded border ${isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                    title="Numbered List (Select multiple lines for multi-item list)"
                >
                    1. List
                </button>

                {/* Text Color */}
                <input
                    type="color"
                    onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                    className="w-8 h-8 rounded border cursor-pointer"
                    title="Text Color"
                />

                {/* Image */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 rounded border bg-white hover:bg-gray-100"
                >
                    📷 Image
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                />

                {/* Link */}
                <button
                    type="button"
                    onClick={handleAddLink}
                    className={`px-3 py-1 rounded border ${isActive('link') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                    🔗 Link
                </button>
            </div>

            {/* Editor */}
            <div className="tiptap-wrapper">
                <EditorContent editor={editor} />
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .tiptap-wrapper :global(.tiptap-editor) {
                    outline: none;
                }
                
                .tiptap-wrapper :global(.tiptap-editor h1) {
                    font-size: 2rem;
                    font-weight: 700;
                    line-height: 1.2;
                    margin: 1rem 0 0.5rem 0;
                }
                
                .tiptap-wrapper :global(.tiptap-editor h2) {
                    font-size: 1.5rem;
                    font-weight: 600;
                    line-height: 1.3;
                    margin: 0.75rem 0 0.5rem 0;
                }
                
                .tiptap-wrapper :global(.tiptap-editor h3) {
                    font-size: 1.25rem;
                    font-weight: 600;
                    line-height: 1.4;
                    margin: 0.5rem 0 0.25rem 0;
                }
                
                .tiptap-wrapper :global(.tiptap-editor p) {
                    margin: 0.5rem 0;
                    line-height: 1.6;
                }
                
                .tiptap-wrapper :global(.tiptap-bullet-list) {
                    list-style-type: disc;
                    margin-left: 1.5rem;
                    margin: 0.5rem 0;
                }
                
                .tiptap-wrapper :global(.tiptap-ordered-list) {
                    list-style-type: decimal;
                    margin-left: 1.5rem;
                    margin: 0.5rem 0;
                }
                
                .tiptap-wrapper :global(.tiptap-list-item) {
                    margin: 0.25rem 0;
                    line-height: 1.6;
                }
                
                .tiptap-wrapper :global(.tiptap-link) {
                    color: #3b82f6;
                    text-decoration: underline;
                }
                
                .tiptap-wrapper :global(.tiptap-link:hover) {
                    color: #1d4ed8;
                }
                
                /* Image wrapper with delete button */
                .tiptap-wrapper :global(.image-wrapper) {
                    position: relative;
                    display: inline-block;
                    margin: 0.5rem 0;
                }
                
                .tiptap-wrapper :global(.tiptap-image) {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.375rem;
                    display: block;
                }
                
                .tiptap-wrapper :global(.image-delete-btn) {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background-color: rgba(239, 68, 68, 0.9);
                    color: white;
                    border: 2px solid white;
                    font-size: 14px;
                    font-weight: bold;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                    z-index: 10;
                }
                
                .tiptap-wrapper :global(.image-wrapper:hover .image-delete-btn) {
                    opacity: 1;
                }
                
                .tiptap-wrapper :global(.image-delete-btn:hover) {
                    background-color: rgba(220, 38, 38, 1);
                    transform: scale(1.1);
                }
                
                .tiptap-wrapper :global(.tiptap-editor strong) {
                    font-weight: 700;
                }
                
                .tiptap-wrapper :global(.tiptap-editor em) {
                    font-style: italic;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;