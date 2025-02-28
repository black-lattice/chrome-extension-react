import React, { useState } from 'react';
import './search.less';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  type SearchEngine = 'google' | 'bing' | 'baidu';
  const [engine, setEngine] = useState<SearchEngine>('google');

  const searchEngines: Record<SearchEngine, string> = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    baidu: 'https://www.baidu.com/s?wd='
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(
        `${searchEngines[engine]}${encodeURIComponent(query)}`,
        '_blank'
      );
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="search-input-group">
          <div className="engine-select">
            <button
              type="button"
              className={`engine-option ${engine === 'google' ? 'active' : ''}`}
              onClick={() => setEngine('google')}
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=google.com&sz=32`}
                alt="Google"
              />
            </button>
            <button
              type="button"
              className={`engine-option ${engine === 'bing' ? 'active' : ''}`}
              onClick={() => setEngine('bing')}
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=bing.com&sz=32`}
                alt="Bing"
              />
            </button>
            <button
              type="button"
              className={`engine-option ${engine === 'baidu' ? 'active' : ''}`}
              onClick={() => setEngine('baidu')}
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=baidu.com&sz=32`}
                alt="百度"
              />
            </button>
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入搜索内容..."
            className="search-input"
          />

          <button type="submit" className="search-button">
            <img src="/icons/search.svg" alt="搜索" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
