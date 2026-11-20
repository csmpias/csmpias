"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapTable from "@tiptap/extension-table";
import TiptapTableRow from "@tiptap/extension-table-row";
import TiptapTableHeader from "@tiptap/extension-table-header";
import TiptapTableCell from "@tiptap/extension-table-cell";
import { CldUploadWidget, type CloudinaryUploadWidgetInfo } from "next-cloudinary";
import {
  UndoIcon,
  RedoIcon,
  BoldIcon,
  ItalicIcon,
  HeadingIcon,
  BulletListIcon,
  OrderedListIcon,
  BlockquoteIcon,
  LinkIcon,
  ImageIcon,
  TableIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const TOOLBAR_BUTTON =
  "flex h-9 min-w-9 items-center justify-center rounded-[4px] border border-transparent px-2 text-ink/70 hover:border-rule hover:bg-paper";
const TOOLBAR_BUTTON_ACTIVE = "border-rule bg-paper text-ink";

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(TOOLBAR_BUTTON, active && TOOLBAR_BUTTON_ACTIVE)}
    >
      {children}
    </button>
  );
}

/** Small inline modal reused for both "insert link" (URL) and "insert image" (alt text) prompts. */
function TextPromptModal({
  title,
  placeholder,
  submitLabel,
  skippable,
  onSubmit,
  onCancel,
}: {
  title: string;
  placeholder: string;
  submitLabel: string;
  skippable?: boolean;
  onSubmit: (value: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState("");

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-sm rounded-[4px] border border-rule bg-paper p-5 shadow-xl">
        <h3 className="font-display text-base font-semibold">{title}</h3>
        <input
          autoFocus
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit(value.trim());
            if (e.key === "Escape") onCancel();
          }}
          placeholder={placeholder}
          className="mt-3 w-full rounded-[4px] border border-rule px-3 py-2 text-sm outline-none focus:border-ink"
        />
        <div className="mt-4 flex justify-end gap-2">
          {skippable ? (
            <button
              type="button"
              onClick={() => onSubmit("")}
              className="rounded-[4px] border border-rule px-3 py-2 text-sm font-medium hover:border-ink"
            >
              Skip (decorative)
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-[4px] border border-rule px-3 py-2 text-sm font-medium hover:border-ink"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={() => onSubmit(value.trim())}
            className="rounded-[4px] bg-accent px-3 py-2 text-sm font-semibold text-paper hover:bg-ink"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);
  const [linkPromptOpen, setLinkPromptOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-rule bg-paper-dim px-2 py-2">
      <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>
        <UndoIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>
        <RedoIcon className="size-4" />
      </ToolbarButton>
      <span className="mx-1 h-6 w-px bg-rule" />
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="size-4" />
      </ToolbarButton>
      <span className="mx-1 h-6 w-px bg-rule" />
      <ToolbarButton
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <HeadingIcon level={2} className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <HeadingIcon level={3} className="size-4" />
      </ToolbarButton>
      <span className="mx-1 h-6 w-px bg-rule" />
      <ToolbarButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <BulletListIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <OrderedListIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Blockquote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <BlockquoteIcon className="size-4" />
      </ToolbarButton>
      <span className="mx-1 h-6 w-px bg-rule" />
      <ToolbarButton label="Insert link" active={editor.isActive("link")} onClick={() => setLinkPromptOpen(true)}>
        <LinkIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Insert table"
        active={editor.isActive("table")}
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <TableIcon className="size-4" />
      </ToolbarButton>
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/sign"
        options={{ folder: "csmp-ias/blog", sources: ["local"], multiple: false }}
        onSuccess={(result) => {
          const info = result.info as CloudinaryUploadWidgetInfo;
          setPendingImageUrl(info.secure_url);
        }}
      >
        {({ open }) => (
          <ToolbarButton label="Insert image" onClick={() => open()}>
            <ImageIcon className="size-4" />
          </ToolbarButton>
        )}
      </CldUploadWidget>

      {linkPromptOpen ? (
        <TextPromptModal
          title="Insert link"
          placeholder="https://example.com"
          submitLabel="Insert"
          onCancel={() => setLinkPromptOpen(false)}
          onSubmit={(url) => {
            setLinkPromptOpen(false);
            if (!url) return;
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
        />
      ) : null}

      {pendingImageUrl ? (
        <TextPromptModal
          title="Image alt text"
          placeholder="Describe the image for screen readers"
          submitLabel="Insert image"
          skippable
          onCancel={() => setPendingImageUrl(null)}
          onSubmit={(altText) => {
            editor.chain().focus().setImage({ src: pendingImageUrl, alt: altText }).run();
            setPendingImageUrl(null);
          }}
        />
      ) : null}
    </div>
  );
}

export function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TiptapImage,
      TiptapLink.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: "Start writing…" }),
      TiptapTable.configure({ resizable: false }),
      TiptapTableRow,
      TiptapTableHeader,
      TiptapTableCell,
    ],
    content,
    editorProps: {
      attributes: {
        class: "prose-admin min-h-full outline-none px-4 py-3 text-sm leading-relaxed",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // The editor is created without initial content synced to external
  // resets (e.g. navigating from "new" to editing a different post) — keep
  // it in step if `content` changes out from under us.
  useEffect(() => {
    if (!editor) return;
    if (content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) {
    return <div className="h-[28rem] rounded-[4px] border border-rule bg-paper" />;
  }

  return (
    <div className="flex flex-col rounded-[4px] border border-rule bg-paper">
      <Toolbar editor={editor} />
      {/* Fixed-height, its own scrollbar — mirrors a plain <textarea rows={16}>.
          Without this, a long Mains answer-writing guide would grow the box
          (and the whole admin page) to fit all of it. overscroll-behavior:
          contain stops scrolling the box from also scrolling the page
          behind it once the box hits its own end. */}
      <div className="h-[28rem] overflow-y-auto [overscroll-behavior:contain]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
