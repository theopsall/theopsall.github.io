import React from 'react';
import { VscTerminal, VscFile, VscClose } from 'react-icons/vsc';
import type { Tab } from './types';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onSwitchTab: (id: string) => void;
  onCloseTab: (id: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTabId, onSwitchTab, onCloseTab }) => {
  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${tab.id === activeTabId ? 'tab-active' : ''}`}
          onClick={() => onSwitchTab(tab.id)}
        >
          <span className="tab-icon">
            {tab.type === 'shell' ? <VscTerminal /> : <VscFile />}
          </span>
          <span className="tab-label">{tab.label}</span>
          {tab.type === 'article' && (
            <button
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
              aria-label={`Close ${tab.label}`}
            >
              <VscClose />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabBar;
