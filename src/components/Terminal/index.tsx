import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import MatrixRain from '../MatrixRain';
import Navbar from '../Navbar';
import TabBar from './TabBar';
import ShellTab from './ShellTab';
import type { ShellTabHandle } from './ShellTab';
import ArticleTab from './ArticleTab';
import NavTab from './NavTab';
import { useArticles } from './useArticles';
import { useTabs } from './useTabs';
import { BatteryFull, BatteryCharging, Wifi, WifiOff, AlarmClock } from 'lucide-react';

const TITLE_BASE = 'theodoros@portfolio ~ %';

type NetConnection = {
  type?: string;
  effectiveType?: string;
  addEventListener: (e: string, cb: () => void) => void;
  removeEventListener: (e: string, cb: () => void) => void;
};

const StatusBar: React.FC = () => {
  const [time, setTime] = useState('');
  const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null);
  const [net, setNet] = useState<{ online: boolean; type: string }>({ online: navigator.onLine, type: '' });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{ level: number; charging: boolean; addEventListener: (e: string, cb: () => void) => void }>;
    };
    if (!nav.getBattery) return;
    nav.getBattery().then((bm) => {
      const update = () => setBattery({ level: bm.level, charging: bm.charging });
      update();
      bm.addEventListener('levelchange', update);
      bm.addEventListener('chargingchange', update);
    });
  }, []);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetConnection }).connection;

    const update = () => {
      setNet({
        online: navigator.onLine,
        type: conn?.type ?? conn?.effectiveType ?? '',
      });
    };

    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    conn?.addEventListener('change', update);

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      conn?.removeEventListener('change', update);
    };
  }, []);

  const batteryLabel = battery ? `${Math.round(battery.level * 100)}%` : '—';
  const batteryColor = battery && battery.level < 0.2 ? '#ef4444' : '#ffffff';
  const BatteryIcon = battery?.charging ? BatteryCharging : BatteryFull;

  const netLabel = !net.online ? 'offline' : (net.type || 'online');
  const netColor = !net.online ? '#ef4444' : '#a3a3a3';
  const NetIcon = net.online ? Wifi : WifiOff;

  return (
    <div className="terminal-status-right">
      <span className="terminal-status-item">
        <BatteryIcon size={14} style={{ color: batteryColor }} />
        <span style={{ color: batteryColor }}>{batteryLabel}</span>
      </span>
      <span className="terminal-status-item">
        <NetIcon size={14} style={{ color: netColor }} />
        <span style={{ color: netColor }}>{netLabel}</span>
      </span>
      <span className="terminal-status-item">
        <AlarmClock size={14} style={{ color: '#ffffff' }} />
        <span>{time}</span>
      </span>
    </div>
  );
};

const NAV_LABELS: Record<string, string> = {
  about: '~/about',
  experience: '~/experience',
  projects: '~/projects',
  skills: '~/skills',
  contact: '~/contact',
};

const Terminal: React.FC = () => {
  const { tabs, activeTabId, titleSuffix, openArticle, openNavTab, switchTab, closeTab } = useTabs();
  const suffixRef = useRef(titleSuffix);
  suffixRef.current = titleSuffix;

  const shellRef = useRef<ShellTabHandle | null>(null);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const activeCommand = activeTab?.type === 'shell' ? 'home' : (activeTab?.command ?? '');

  const handleNavCommand = (cmd: string) => {
    if (cmd === 'home') { switchTab('shell'); return; }
    openNavTab(cmd, NAV_LABELS[cmd] ?? `~/${cmd}`);
  };

  useEffect(() => {
    let visible = true;
    const update = () => {
      const suffix = suffixRef.current ? ` ${suffixRef.current}` : '';
      document.title = `${TITLE_BASE}${suffix}${visible ? ' █' : ''}`;
    };
    update();
    const id = setInterval(() => {
      visible = !visible;
      update();
    }, 530);
    return () => clearInterval(id);
  }, []);

  const { articles, fetchArticle, getArticleBySlug } = useArticles();

  return (
    <div className="terminal-container">
      <MatrixRain className="matrix-rain-background" />
      <Navbar activeCommand={activeCommand} onRunCommand={handleNavCommand} />

      <div className="terminal-overlay">
        <div className="terminal-window">

          {/* Title Bar */}
          <div className="terminal-header">
            <div className="traffic-lights">
              <span className="light" />
              <span className="light" />
              <span className="light" />
            </div>
            <div className="terminal-title">
              theo@tpsallidas.dev: ~/cv
            </div>
            <StatusBar />
          </div>

          {/* Tab Strip */}
          <TabBar
            tabs={tabs}
            activeTabId={activeTabId}
            onSwitchTab={switchTab}
            onCloseTab={closeTab}
          />

          {/* Content Area */}
          <div className="terminal-content-area">
            <ShellTab
              ref={shellRef}
              isActive={activeTabId === 'shell'}
              articles={articles}
              onOpenArticle={(slug, title) => openArticle(slug, title)}
              fetchArticle={fetchArticle}
            />

            {tabs
              .filter((t) => t.type === 'nav')
              .map((tab) => (
                <NavTab
                  key={tab.id}
                  command={tab.command!}
                  isActive={activeTabId === tab.id}
                  articles={articles}
                  onOpenArticle={(slug, title) => openArticle(slug, title)}
                  fetchArticle={fetchArticle}
                />
              ))}

            {tabs
              .filter((t) => t.type === 'article')
              .map((tab) => (
                <ArticleTab
                  key={tab.id}
                  slug={tab.slug!}
                  meta={getArticleBySlug(tab.slug!)}
                  fetchArticle={fetchArticle}
                  isActive={activeTabId === tab.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
