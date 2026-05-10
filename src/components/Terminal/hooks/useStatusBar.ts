import { useState, useEffect } from 'react';

type NetConnection = {
  type?: string;
  effectiveType?: string;
  addEventListener: (e: string, cb: () => void) => void;
  removeEventListener: (e: string, cb: () => void) => void;
};

export const useStatusBar = () => {
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
    const update = () => setNet({ online: navigator.onLine, type: conn?.type ?? conn?.effectiveType ?? '' });
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
  const isCharging = battery?.charging ?? false;
  const netLabel = !net.online ? 'offline' : (net.type || 'online');
  const netColor = !net.online ? '#ef4444' : '#a3a3a3';
  const isOnline = net.online;

  return { time, batteryLabel, batteryColor, isCharging, netLabel, netColor, isOnline };
};
