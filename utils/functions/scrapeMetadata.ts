export async function scrapeMetadata(url: string): Promise<
  | {
      name: string;
      description: string;
      image?: string;
    }
  | undefined
> {
  try {

    const normalizeUrl = (url: string): string | null => {
      const trimmed = url.trim();
      if (!trimmed) return null;
      let normalized = trimmed;
      if (!/^https?:\/\//i.test(normalized)) {
        normalized = 'https://' + normalized;
      }
      try {
        new URL(normalized);
        return normalized;
      } catch {
        return null;
      }
    };

    const finalUrl = normalizeUrl(url);

    if (!finalUrl) {
      return;
    }

    const response = await fetch('/api/campaign/scrape-metatags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: finalUrl }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to scrape metadata');
    }

    const data = await response.json();
    console.log(`✓ Fetched metadata from ${finalUrl}`);

    return data;
  } catch (error) {
    console.error(`Failed to fetch metadata for ${url}:`, error);
    throw new Error('Could not fetch website metadata. Please enter details manually.');
  }
}
