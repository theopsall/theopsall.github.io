import React from 'react';
import { BatteryFull, BatteryCharging, Wifi, WifiOff, AlarmClock } from 'lucide-react';
import { useStatusBar } from '@/components/Terminal/hooks/useStatusBar';

const StatusBar: React.FC = () => {
  const { time, batteryLabel, batteryColor, isCharging, netLabel, netColor, isOnline } = useStatusBar();
  const BatteryIcon = isCharging ? BatteryCharging : BatteryFull;
  const NetIcon = isOnline ? Wifi : WifiOff;

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

export default StatusBar;
