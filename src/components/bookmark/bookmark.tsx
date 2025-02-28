import { ChromeBookmark } from './types.ts';
import './bookmark.less';

interface BookmarkProps {
  bookmarks: ChromeBookmark[];
  loading: boolean;
  error: string | null;
}

export default function Bookmark({ bookmarks, loading, error }: BookmarkProps) {
  const jump = (url: string) => {
    window.location.href = url;
  };

  if (loading) {
    return <div className="app__loading">Loading bookmarks...</div>;
  }

  if (error) {
    return <div className="app__error">Error: {error}</div>;
  }

  return (
    <div className="app__container">
      {bookmarks.length === 0 ? (
        <p className="app__empty">No bookmarks found in any 'tabs' folder</p>
      ) : (
        <div className="app__bookmarks">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="app__bookmark-item">
              {bookmark.url ? (
                <div
                  className="app__bookmark-link"
                  onClick={() => jump(bookmark.url!)}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${
                      new URL(bookmark.url).hostname
                    }&sz=128`}
                    alt="favicon"
                    className="app__bookmark-icon"
                  />
                  <span className="app__bookmark-title">
                    {bookmark.title || bookmark.url}
                  </span>
                </div>
              ) : (
                <span className="app__bookmark-text">{bookmark.title}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
