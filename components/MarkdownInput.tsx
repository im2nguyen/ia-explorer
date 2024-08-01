import React, { KeyboardEvent, useRef, useEffect } from 'react';

interface MarkdownInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownInput: React.FC<MarkdownInputProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleTab(e.currentTarget, e.shiftKey);
    } else if (e.key === 'Enter') {
      handleEnter(e);
    }
  };

  const handleTab = (textarea: HTMLTextAreaElement, isShiftTab: boolean) => {
    // ... (keep existing handleTab logic)
  };

  const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const { selectionStart } = textarea;
    const currentLine = value.substring(0, selectionStart).split('\n').pop() || '';
    const match = currentLine.match(/^(\s*(?:[-*!]|\d+\.)\s*)/);
    
    if (match) {
      e.preventDefault();
      const indent = match[1];

      // Check if the current line is empty (except for the list marker)
      if (currentLine.trim() === indent.trim()) {
        // If empty, remove the list marker
        const newValue = value.substring(0, selectionStart - indent.length) + '\n' + value.substring(selectionStart);
        onChange(newValue);
        const newCursorPosition = selectionStart - indent.length + 1;
        requestAnimationFrame(() => {
          textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        });
      } else {
        // If not empty, continue the list
        const newValue = value.substring(0, selectionStart) + '\n' + indent + value.substring(selectionStart);
        onChange(newValue);
        const newCursorPosition = selectionStart + indent.length + 1;
        requestAnimationFrame(() => {
          textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        });
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className="w-full min-h-[200px] p-4 font-mono text-sm border border-gray-300 rounded-md resize-y"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default MarkdownInput;