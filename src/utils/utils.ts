export async function getSvgFavicon(url: string): Promise<string> {
  try {
    // 创建 URL 对象解析域名
    const urlObj = new URL(url);
    const domain = urlObj.origin;

    // 首先尝试获取网站根目录的 favicon.ico
    try {
      const faviconResponse = await fetch(`${domain}/favicon.ico`, {
        method: 'HEAD'
      });
      if (faviconResponse.ok) {
        return `${domain}/favicon.ico`;
      }
    } catch (error) {
      console.log('根目录 favicon.ico 不存在');
    }

    // 如果根目录没有 favicon.ico,则获取页面 HTML
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'text/html'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // 查找所有图标链接
    const iconLinks = Array.from(doc.querySelectorAll('link[rel*="icon"]'));

    // 按优先级排序图标
    const priorityOrder = [
      'image/svg+xml', // SVG
      'image/png', // PNG
      'image/x-icon', // ICO
      'image/vnd.microsoft.icon'
    ];

    // 根据类型排序图标
    iconLinks.sort((a, b) => {
      const typeA = a.getAttribute('type') || '';
      const typeB = b.getAttribute('type') || '';
      return priorityOrder.indexOf(typeA) - priorityOrder.indexOf(typeB);
    });

    // 获取最优先的图标
    const bestIcon = iconLinks[0] as HTMLLinkElement;
    if (bestIcon && bestIcon.href) {
      return resolveUrl(url, bestIcon.href);
    }
  } catch (error) {
    console.error('获取网站图标失败:', error);
  }

  // 如果都失败了返回空字符串
  return '';
}
/**
 * 将相对路径转换为绝对路径
 * @param {string} baseUrl - 基础URL（例如 "https://example.com"）
 * @param {string} relativeUrl - 相对路径（例如 "/favicon.ico" 或 "images/icon.png"）
 * @returns {string} - 返回绝对路径
 */
function resolveUrl(baseUrl: string, relativeUrl: string) {
  try {
    // 使用 URL 构造函数将相对路径解析为绝对路径
    return new URL(relativeUrl, baseUrl).href;
  } catch (error) {
    console.error('Error resolving URL:', error);
    return relativeUrl; // 如果解析失败，返回原始路径
  }
}
