import React, { useEffect, useState } from 'react';
import './history.less';

interface HistoryItem {
  id: string;
  title?: string;
  url?: string;
  lastVisitTime?: number;
}

const History: React.FC = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    chrome.history.search({ text: '', maxResults: 18 }, (data) => {
      setHistoryItems(data);
    });
  }, []);

  return (
    <div className="history-container">
      <h2 className="history-title">浏览历史</h2>
      <ul className="history-list">
        {historyItems.map((item) => (
          <li key={item.id} className="history-item">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="history-link"
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=128`}
                alt=""
                className="history-favicon"
              />
              <div className="history-content">
                <div className="history-text">{item.title}</div>
                <div className="history-url">{item.url}</div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
