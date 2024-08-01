import { ChevronRight, ChevronDown } from 'lucide-react';

export interface NavItemData {
  id: number;
  text: string;
  link?: string;
  url?: string;
  filePath?: string;
  children: NavItemData[];
  isGenerated: boolean;
  isNew?: boolean;
  isNavHeader?: boolean;
}

interface NavItemProps {
  item: NavItemData;
  depth?: number;
  onSelect: (item: NavItemData) => void;
  expandedItems: Set<number>;
  onToggle: (id: number) => void;
}

const NavItem = ({ item, depth = 0, onSelect, expandedItems, onToggle }: NavItemProps) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.has(item.id);

  const getDotColor = () => {
    if (item.isNew) return 'bg-red-500';
    if (item.link) return 'bg-green-500';
    return 'bg-gray-400';
  };

  const getTextColor = () => {
    if (!item.filePath && !item.url && !item.isNavHeader) return 'text-red-500';
    return '';
  };

  const displayText = item.text.replace(/ NEW$/, '');

  return (
    <div className="mb-1">
      <div
        className={`flex items-center cursor-pointer hover:bg-gray-100 rounded p-2 ${
          depth > 0 ? `ml-${depth * 4}` : ''
        }`}
        onClick={() => {
          onToggle(item.id);
          onSelect(item);
        }}
      >
        {depth > 0 && (
          <div className="flex items-center mr-2">
            {[...Array(depth)].map((_, index) => (
              <span 
                key={index} 
                className={`w-2 h-2 rounded-full ${index === depth - 1 ? getDotColor() : 'bg-gray-300'} mr-1`}
              />
            ))}
          </div>
        )}
        <span className={`${item.isNavHeader ? 'font-bold uppercase' : depth > 0 ? 'text-gray-600' : 'font-semibold'} flex-grow ${getTextColor()}`}>
          {displayText}
        </span>
        {hasChildren && !item.isNavHeader && (
          <span className="ml-2">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </div>
      {isExpanded && hasChildren && (
        <div className="mt-1">
          {item.children.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onSelect={onSelect}
              expandedItems={expandedItems}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;