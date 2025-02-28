import { useState, useEffect } from 'react';
import './App.less';
import Search from './components/search/search';
import BackgroundSwitcher from './components/background/background';
import Bookmark from './components/bookmark/bookmark';
import { ChromeBookmark } from './components/bookmark/types';

function App() {
  const [bookmarks, setBookmarks] = useState<ChromeBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const findTabsBookmarks = (node: ChromeBookmark): ChromeBookmark[] => {
    let results: ChromeBookmark[] = [];

    if (node.children) {
      if (node.title.toLowerCase() === 'tabs') {
        results = [...results, ...node.children];
      }
      for (const child of node.children) {
        results = [...results, ...findTabsBookmarks(child)];
      }
    }

    return results;
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const tree = await chrome.bookmarks.getTree();
        const tabsBookmarks = findTabsBookmarks(tree[0]);
        setBookmarks(tabsBookmarks);
        setError(null);
      } catch (err) {
        setError(
          'Failed to fetch bookmarks: ' +
            (err instanceof Error ? err.message : String(err))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="app">
      <Search />
      <BackgroundSwitcher />
      <Bookmark bookmarks={bookmarks} loading={loading} error={error} />
    </div>
  );
}

export default App;
