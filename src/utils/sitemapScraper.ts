export async function fetchSitemapAndExtractURLs(sitemapUrl: string): Promise<string[]> {
  try {
    const response = await fetch(sitemapUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const xmlText = await response.text();
    return extractURLsFromSitemap(xmlText);
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    throw error;
  }
}

function extractURLsFromSitemap(sitemapText: string): string[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(sitemapText, 'text/xml');
  
  // Check for parsing errors
  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    console.error('XML parsing error:', parserError.textContent);
    throw new Error('Failed to parse sitemap XML');
  }

  // Try different XML namespaces
  const namespaces = [
    'http://www.sitemaps.org/schemas/sitemap/0.9',
    'http://www.google.com/schemas/sitemap/0.84',
    ''  // No namespace
  ];

  for (const ns of namespaces) {
    const urlElements = xmlDoc.getElementsByTagNameNS(ns, 'url');
    if (urlElements.length > 0) {
      return Array.from(urlElements)
        .map(urlElement => {
          const locElement = urlElement.getElementsByTagNameNS(ns, 'loc')[0];
          return locElement ? locElement.textContent : null;
        })
        .filter((url): url is string => url !== null);
    }
  }

  // If no URLs found, check if it's a sitemap index
  const sitemapElements = xmlDoc.getElementsByTagName('sitemap');
  if (sitemapElements.length > 0) {
    throw new Error('This appears to be a sitemap index. Please provide a specific sitemap URL.');
  }

  throw new Error('No URLs found in the sitemap');
}

export function filterURLs(urls: string[]): string[] {
  const nonPageExtensions = ['jpg', 'png', 'gif', 'bmp', 'svg', 'webp', 'ico', 'mp4', 'avi', 'mov', 'pdf', 'docx', 'js', 'css', 'xml', 'json'];
  return urls.filter(url => {
    const extension = url.split('.').pop()?.toLowerCase();
    return !extension || !nonPageExtensions.includes(extension);
  });
}
