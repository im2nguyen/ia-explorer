import { useState, useCallback } from "react";
import NavItem from "@/components/NavItem";
import { NavItemData } from "@/components/NavItem";
import { ChevronsUpDown } from 'lucide-react';

interface NavPreviewProps {
  items: NavItemData[];
  onSelect: (item: NavItemData) => void;
}

const getAllItemIds = (items: NavItemData[]): number[] => {
  let ids: number[] = [];
  for (const item of items) {
    ids.push(item.id);
    if (item.children && item.children.length > 0) {
      ids = ids.concat(getAllItemIds(item.children));
    }
  }
  return ids;
};

const NavPreview = ({ items, onSelect }: NavPreviewProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = useCallback((id: number) => {
    setExpandedItems((prevExpanded) => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setExpandedItems((prevExpanded) => {
      if (prevExpanded.size === 0) {
        // Expand all
        const allIds = getAllItemIds(items);
        return new Set(allIds);
      } else {
        // Collapse all
        return new Set();
      }
    });
  }, [items]);

  return (
    <div className="p-4 border border-gray-300 rounded-md bg-white">
      <button
        onClick={toggleAll}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
      >
        <ChevronsUpDown size={16} className="mr-2" />
        {expandedItems.size === 0 ? 'Expand All' : 'Collapse All'}
      </button>
      {items.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          onSelect={onSelect}
          expandedItems={expandedItems}
          onToggle={toggleItem}
        />
      ))}
    </div>
  );
};

export default NavPreview;