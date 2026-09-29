import React from 'react';
import { Terminal, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Tab } from '@/components/Terminal/types';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onSwitchTab: (id: string) => void;
  onCloseTab: (id: string) => void;
}

const TabIcon: React.FC<{ type: Tab['type'] }> = ({ type }) => {
  if (type === 'shell') return <Terminal size={12} className="cv-tab-icon" />;
  return <FileText size={12} className="cv-tab-icon" />;
};

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTabId, onSwitchTab, onCloseTab }) => tabs.length < 2 ? null : (
  <div className="cv-tab-strip">
    {tabs.map((tab) => {
      const isActive = tab.id === activeTabId;
      const isShell = tab.type === 'shell';
      return (
        <Button
          key={tab.id}
          variant="ghost"
          className={`cv-tab${isActive ? (isShell ? ' cv-tab-terminal-active' : ' cv-tab-shell-active') : ' cv-tab-inactive-item'}`}
          onClick={() => onSwitchTab(tab.id)}
          type="button"
          aria-label={tab.label}
          aria-current={isActive ? 'page' : undefined}
        >
          <TabIcon type={tab.type} />
          <span className="cv-tab-label">{tab.label}</span>
          {isActive && isShell && <span className="cv-tab-dot" />}
          {!isShell && (
            <Button
              variant="ghost"
              className="cv-tab-close-btn"
              onClick={(e) => { e.stopPropagation(); onCloseTab(tab.id); }}
              aria-label={`Close ${tab.label}`}
              type="button"
            >
              ×
            </Button>
          )}
        </Button>
      );
    })}
  </div>
);

export default TabBar;
