import React from 'react';
import { SUPPORTED_CURRENCIES } from '../data/mockData';

export const LiveTickerStrip: React.FC = () => {
  const tickerItems = SUPPORTED_CURRENCIES.filter((currency) => currency.popular);

  const renderItems = (copy: string) => tickerItems.map((item) => (
    <div key={`${copy}-${item.code}`} className="ticker-item">
      <span className="code">{item.code}</span>
      <span className="price">${item.type === 'crypto' ? item.rateToUSD.toLocaleString() : item.rateToUSD.toFixed(3)}</span>
      <span className={`delta ${item.change24h >= 0 ? 'up' : 'down'}`}>
        {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
      </span>
    </div>
  ));

  return (
    <div className="ticker" aria-label="Live FX and crypto rates">
      <div className="ticker-label">
        <span className="dot" />LIVE FX &amp; CRYPTO
      </div>
      <div className="ticker-track">
        <div className="ticker-content">{renderItems('primary')}</div>
        <div className="ticker-content" aria-hidden="true">{renderItems('duplicate')}</div>
      </div>
    </div>
  );
};
