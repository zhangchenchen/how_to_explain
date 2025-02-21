"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ExplanationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function ExplanationDialog({
  open,
  onOpenChange,
  content,
}: ExplanationDialogProps) {
  // Add debug output
  console.log("ExplanationDialog render:", { open, contentLength: content?.length });

  // 检查文本块是否是 ASCII 图表
  const isAsciiArt = (text: string) => {
    return text.includes('│') || 
           text.includes('─') || 
           text.includes('└') || 
           text.includes('┌') ||
           text.includes('->') ||
           text.includes('=>') ||
           text.includes('|') ||
           text.includes('+---') ||
           text.includes('----');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold">
            Explanation
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-6 px-8">
          <div className="prose prose-lg dark:prose-invert prose-headings:mb-4 prose-p:mb-4 prose-li:mb-2">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // Headers
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mb-6 pb-2 border-b">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>
                ),
                // Lists
                ul: ({ children }) => (
                  <ul className="my-4 list-disc list-inside space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-4 list-decimal list-inside space-y-2">{children}</ol>
                ),
                // Tables
                table: (props) => (
                  <div className="my-6 overflow-x-auto rounded-lg border">
                    <table className="min-w-full divide-y divide-gray-200" {...props} />
                  </div>
                ),
                th: (props) => (
                  <th className="bg-gray-50 dark:bg-gray-800 px-6 py-3 text-left text-sm font-semibold" {...props} />
                ),
                td: (props) => (
                  <td className="px-6 py-4 whitespace-normal text-sm" {...props} />
                ),
                // Code blocks
                code: ({ inline, className, children }: CodeProps) => {
                  if (inline) {
                    return <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">{children}</code>;
                  }
                  
                  const content = String(children).trim();
                  if (isAsciiArt(content)) {
                    return (
                      <div className="ascii-art-container">
                        <code className="ascii-art block w-full">
                          {content}
                        </code>
                      </div>
                    );
                  }
                  
                  return (
                    <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <code>{content}</code>
                    </pre>
                  );
                },
                // Paragraphs and emphasis
                p: (props) => (
                  <p className="leading-relaxed mb-4" {...props} />
                ),
                em: (props) => (
                  <em className="italic text-gray-600 dark:text-gray-300" {...props} />
                ),
                strong: (props) => (
                  <strong className="font-semibold" {...props} />
                ),
                // Block quotes
                blockquote: (props) => (
                  <blockquote className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 my-4 italic" {...props} />
                ),
                // 处理预格式化文本
                pre: ({ children }) => {
                  const content = String(children).trim();
                  if (isAsciiArt(content)) {
                    return (
                      <div className="ascii-art-container">
                        <pre className="ascii-art">
                          {content}
                        </pre>
                      </div>
                    );
                  }
                  return <pre className="overflow-auto">{children}</pre>;
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 