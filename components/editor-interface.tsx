"use client"
import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import { EditorProvider, useCurrentEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Pilcrow,
    RemoveFormatting,
    Palette,
    CodeSquare,
    Minus,
    CornerDownLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    const headingLevels = [
        { level: 1, icon: <Heading1 className="h-4 w-4" />, label: "Heading 1" },
        { level: 2, icon: <Heading2 className="h-4 w-4" />, label: "Heading 2" },
        { level: 3, icon: <Heading3 className="h-4 w-4" />, label: "Heading 3" },
    ]

    const colorOptions = [
        { color: "#000000", label: "Black" },
        { color: "#5E5E5E", label: "Gray" },
        { color: "#E03131", label: "Red" },
        { color: "#2F9E44", label: "Green" },
        { color: "#1971C2", label: "Blue" },
        { color: "#F08C00", label: "Orange" },
        { color: "#6741D9", label: "Purple" },
    ]

    return (
        <TooltipProvider>
            <div className="border-b p-1 flex flex-wrap items-center gap-1 bg-muted/30">
                <div className="flex items-center gap-1 mr-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={editor.isActive("bold") ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                disabled={!editor.can().chain().focus().toggleBold().run()}
                                className="h-8 w-8"
                            >
                                <Bold className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Bold</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={editor.isActive("italic") ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                disabled={!editor.can().chain().focus().toggleItalic().run()}
                                className="h-8 w-8"
                            >
                                <Italic className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Italic</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={editor.isActive("strike") ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                disabled={!editor.can().chain().focus().toggleStrike().run()}
                                className="h-8 w-8"
                            >
                                <Strikethrough className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Strikethrough</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={editor.isActive("code") ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => editor.chain().focus().toggleCode().run()}
                                disabled={!editor.can().chain().focus().toggleCode().run()}
                                className="h-8 w-8"
                            >
                                <Code className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Inline Code</TooltipContent>
                    </Tooltip>
                </div>

                <div className="h-6 w-px bg-border mx-1" />

                <div className="flex items-center gap-1 mr-2">
                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn("h-8 w-8", editor.isActive("heading") && "bg-secondary")}
                                    >
                                        <Heading1 className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Headings</TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().setParagraph().run()}
                                className={cn("flex items-center gap-2", editor.isActive("paragraph") && "bg-secondary")}
                            >
                                <Pilcrow className="h-4 w-4" />
                                <span>Paragraph</span>
                            </DropdownMenuItem>

                            {headingLevels.map((heading) => (
                                <DropdownMenuItem
                                    key={heading.level}
                                    onClick={() => editor.chain().focus().toggleHeading({ level: heading.level }).run()}
                                    className={cn(
                                        "flex items-center gap-2",
                                        editor.isActive("heading", { level: heading.level }) && "bg-secondary",
                                    )}
                                >
                                    {heading.icon}
                                    <span>{heading.label}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className="h-8 w-8"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Bullet List</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                className="h-8 w-8"
                            >
                                <ListOrdered className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Ordered List</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                className="h-8 w-8"
                            >
                                <Quote className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Blockquote</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                className="h-8 w-8"
                            >
                                <CodeSquare className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Code Block</TooltipContent>
                    </Tooltip>
                </div>

                <div className="h-6 w-px bg-border mx-1" />

                <div className="flex items-center gap-1 mr-2">
                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Palette className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Text Color</TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent align="start">
                            {colorOptions.map((option) => (
                                <DropdownMenuItem
                                    key={option.color}
                                    onClick={() => editor.chain().focus().setColor(option.color).run()}
                                    className="flex items-center gap-2"
                                >
                                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: option.color }} />
                                    <span>{option.label}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                                className="h-8 w-8"
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Horizontal Rule</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => editor.chain().focus().setHardBreak().run()}
                                className="h-8 w-8"
                            >
                                <CornerDownLeft className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Hard Break</TooltipContent>
                    </Tooltip>
                </div>

                <div className="h-6 w-px bg-border mx-1" />

                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => editor.chain().focus().unsetAllMarks().run()}
                                className="h-8 w-8"
                            >
                                <RemoveFormatting className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Clear Formatting</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => editor.chain().focus().undo().run()}
                                disabled={!editor.can().chain().focus().undo().run()}
                                className="h-8 w-8"
                            >
                                <Undo className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Undo</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => editor.chain().focus().redo().run()}
                                disabled={!editor.can().chain().focus().redo().run()}
                                className="h-8 w-8"
                            >
                                <Redo className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Redo</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
}

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure(),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
    Placeholder.configure({
        placeholder: "Write something...",
    }),
]

const initialContent = `
<h2>
  Welcome to the AI Writer Editor
</h2>
<p>
  This is a <em>rich text editor</em> with a <strong>Notion-like</strong> interface. You can:
</p>
<ul>
  <li>
    Format text with various styles
  </li>
  <li>
    Create headings, lists, and blockquotes
  </li>
  <li>
    Add code blocks and more
  </li>
</ul>
<p>
  Try it out by editing this text or creating your own content!
</p>
<blockquote>
  The editor supports all the formatting options you need for professional writing.
</blockquote>
`

export default function EditorInterface() {
    return (
        <Card className="border shadow-sm">
            <CardContent className="p-0">
                <EditorProvider
                    slotBefore={<MenuBar />}
                    extensions={extensions}
                    content={initialContent}
                    editorProps={{
                        attributes: {
                            class: "prose prose-sm sm:prose dark:prose-invert focus:outline-none max-w-none p-4 min-h-[300px]",
                        },
                    }}
                />
            </CardContent>
        </Card>
    )
}
