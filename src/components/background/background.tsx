import { useState, useRef, useEffect } from 'react';
import './background.less';

export default function BackgroundSwitcher() {
  const [showPopup, setShowPopup] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadBackground = async () => {
      const result = await chrome.storage.local.get('backgroundImage');
      if (result.backgroundImage) {
        document.body.style.backgroundImage = `url(${result.backgroundImage})`;
        setImageUrl(result.backgroundImage);
      }
    };
    loadBackground();
  }, []);

  const handleApplyBackground = async (url: string) => {
    document.body.style.backgroundImage = `url(${url})`;
    await chrome.storage.local.set({ backgroundImage: url });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        handleApplyBackground(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="background-switcher">
      <button
        className="toggle-button"
        onClick={() => setShowPopup(!showPopup)}
      >
        切换背景
      </button>

      {showPopup && (
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <div className="input-group">
            <input
              type="text"
              placeholder="输入网络图片URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button
              onClick={() => handleApplyBackground(imageUrl)}
              disabled={!imageUrl}
            >
              应用网络背景
            </button>
          </div>

          <div className="or-divider">或</div>

          <div className="input-group">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button onClick={() => fileInputRef.current?.click()}>
              选择本地图片
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
