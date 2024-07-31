"use client";

import { useState, useEffect } from "react";

import { NavItemData } from "@/components/NavItem";
import MarkdownInput from "@/components/MarkdownInput";
import NavPreview from "@/components/NavPreview";
import DetailsCard from "@/components/DetailsCard";
import Legend from "@/components/Legend";

const parseMarkdown = (markdown: string): NavItemData[] => {
  const lines = markdown.split("\n");
  const items: NavItemData[] = [];
  const stack: { level: number; item: NavItemData; path: string[] }[] = [
    {
      level: -1,
      item: { id: -1, text: "", children: items, isGenerated: false },
      path: [],
    },
  ];
  let id = 0;

  const getPathSegment = (text: string): string => {
    const pathMatch = text.match(/\((\/[^)]+)\)$/);
    if (pathMatch) {
      return pathMatch[1].replace(/^\//, "");
    }
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("*")) {
      const level = line.indexOf("*") / 2;
      const text = trimmedLine.substring(1).trim();
      const linkMatch = text.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const pathMatch = text.match(/\((\/[^)]+)\)$/);
      const isGenerated = !text.includes("(");
      const isNew = text.includes(" NEW");

      const newItem: NavItemData = {
        id: id++,
        text: linkMatch ? linkMatch[1] : text.replace(/\([^)]+\)$/, "").trim(),
        link: linkMatch ? linkMatch[2] : undefined,
        children: [],
        isGenerated,
        isNew,
      };

      if (pathMatch) {
        newItem.filePath = pathMatch[1];
        newItem.url = pathMatch[1];
      }

      while (stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      const currentPath = [
        ...stack[stack.length - 1].path,
        getPathSegment(text),
      ];

      if (level > 0 && !newItem.filePath) {
        if (newItem.text.toLowerCase() === "overview") {
          newItem.url = "/" + currentPath.slice(0, -1).join("/");
          newItem.filePath =
            "/" + currentPath.slice(0, -1).join("/") + "/index.mdx";
        } else if (pathMatch) {
          newItem.url = "/" + currentPath.join("/");
          newItem.filePath = "/" + currentPath.join("/") + ".mdx";
        }
      }

      stack[stack.length - 1].item.children.push(newItem);
      stack.push({ level, item: newItem, path: currentPath });
    }
  });

  return items;
};

const defaultMarkdown = `## Example IA
* Introduction to ProductX (/intro)
    * [What is ProductX?](https://example.com/productx/intro) (/what-is)
    * [Workflows](https://example.com/productx/workflows) (/workflow)
    * Use cases (/use-cases)
        * [Overview](https://example.com/productx/use-cases)
        * Enterprise applications (/enterprise-apps)
        * Cross-platform development (/cross-platform)
        * Automated processes (/automation)
        * etc
    * Compare ProductX (/compare)
        * [Overview](https://example.com/productx/compare)
           * [Overview](https://example.com/productx/compare/details)
        * ProductX versus CompetitorA (/competitor-a)
        * ProductX versus CompetitorB (/competitor-b)
* Getting Started with ProductX (/getting-started)
    * [Quick Start Guide](https://example.com/productx/quickstart) (/quick-start)
    * [Installation](https://example.com/productx/install) (/installation)
    * Tutorials (/tutorials)
        * [Overview](https://example.com/productx/tutorials)
        * Beginner tutorial (/beginner)
        * Advanced tutorial (/advanced)
        * Expert tutorial (/expert)
        * etc
    * Best Practices (/best-practices)
        * [Overview](https://example.com/productx/best-practices)
           * [Detailed Overview](https://example.com/productx/best-practices/details)
        * Performance optimization (/optimization)
        * Security guidelines (/security)
    * Core Concepts (/concepts)
        * Overview 
        * [Components](https://example.com/productx/components) (/components)
        * Data management (/data)
        * Configuration options (/configuration)
        * Modules (/modules)
        * Advanced concepts`;

const IAExplorer = () => {
  const [markdown, setMarkdown] = useState("");
  const [selectedItem, setSelectedItem] = useState<NavItemData | null>(null);

  useEffect(() => {
    const savedMarkdown = localStorage.getItem("markdownContent");
    if (savedMarkdown) {
      setMarkdown(savedMarkdown);
    } else {
      setMarkdown(defaultMarkdown);
      localStorage.setItem("markdownContent", defaultMarkdown);
    }
  }, []);

  const handleMarkdownChange = (newMarkdown: string) => {
    setMarkdown(newMarkdown);
    localStorage.setItem("markdownContent", newMarkdown);
  };

  const parsedItems = parseMarkdown(markdown);

  return (
    <div className="flex flex-grow">
      <div className="w-1/2 p-4 border-r">
        <h2 className="text-lg font-semibold mb-2">Markdown Input</h2>
        <MarkdownInput value={markdown} onChange={handleMarkdownChange} />
      </div>
      <div className="w-1/2 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-2">Navigation Preview</h2>
          <Legend />
        </div>
        <div className="flex-grow flex overflow-hidden">
          <div className="w-1/2 overflow-auto p-4">
            <NavPreview items={parsedItems} onSelect={setSelectedItem} />
          </div>
          <div className="w-1/2 overflow-auto border-l">
            <div className="sticky top-0 p-4">
              {selectedItem && <DetailsCard item={selectedItem} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IAExplorer;
