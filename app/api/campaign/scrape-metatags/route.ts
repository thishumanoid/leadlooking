import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL
    let validUrl: URL;
    try {
      validUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    let name = '';
    let description = '';
    let image = '';

    // Strategy 1: Cheerio with improved headers
    try {
      const response = await fetch(validUrl.toString(), {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
        signal: AbortSignal.timeout(8000),
      });

      if (response.ok) {
        const html = await response.text();
        const $ = cheerio.load(html);

        name =
          $('meta[property="og:title"]').attr('content') ||
          $('meta[name="twitter:title"]').attr('content') ||
          $('meta[property="og:site_name"]').attr('content') ||
          $('title').text() ||
          $('h1').first().text() ||
          '';

        description =
          $('meta[property="og:description"]').attr('content') ||
          $('meta[name="twitter:description"]').attr('content') ||
          $('meta[name="description"]').attr('content') ||
          $('p').first().text() ||
          '';

        image =
          $('meta[property="og:image"]').attr('content') ||
          $('meta[name="twitter:image"]').attr('content') ||
          $('link[rel="apple-touch-icon"]').attr('href') ||
          $('link[rel="icon"]').attr('href') ||
          '';
      }
    } catch (e) {
      console.warn('Cheerio scraping failed, falling back to metadata-scraper:', e);
    }

    // Cleaning and trimming
    const cleanName = name.trim();
    const cleanDescription = description.trim().substring(0, 750);


    return NextResponse.json({
      name: cleanName,
      description: cleanDescription,
      image: '',
    });
  } catch (error) {
    console.error('Scraping handler error:', error);
    return NextResponse.json({ error: 'Failed to scrape metadata' }, { status: 500 });
  }
}
