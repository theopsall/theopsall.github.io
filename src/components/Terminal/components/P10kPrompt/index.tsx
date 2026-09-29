import React from 'react';

const formatTime = (d: Date) =>
  d.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

export const P10kInfoLine: React.FC<{ showTime?: boolean; time?: Date; cwd?: string }> = ({
  showTime = false,
  time,
  cwd = '~',
}) => (
  <div className="p10k-info-line">
    <span className="p10k-segment p10k-segment-left">
      <span className="p10k-seg-text">{cwd}</span>
      <span className="p10k-seg-cap-right"></span>
    </span>
    {showTime && (
      <span className="p10k-segment p10k-segment-right">
        <span className="p10k-seg-cap-left"></span>
        <span className="p10k-seg-text">at {time ? formatTime(time) : ''}</span>
      </span>
    )}
  </div>
);

export const P10kArrow: React.FC = () => <span className="p10k-arrow-only">❯</span>;

export const P10kActiveArrow: React.FC = () => <span className="p10k-arrow-active">❯</span>;
