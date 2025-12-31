export async function scrapeMetadata(url: string): Promise<{
  name: string;
  description: string;
  image?: string;
}> {
  try {
    const response = await fetch('/api/campaign/scrape-metatags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to scrape metadata');
    }

    const data = await response.json();
    console.log(`✓ Fetched metadata from ${url}`);
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch metadata for ${url}:`, error);
    throw new Error('Could not fetch website metadata. Please enter details manually.');
  }
}