import { generateKeywords } from '@/worker/ai/generateKeywords';


export async function POST(request: Request) {
  console.log('🔥 Received API request for keyword generation');

  try {
    const { productDescription } = await request.json();

    console.log(
      '📝 Product description:',
      productDescription
    );

    const result = await generateKeywords((productDescription || '').slice(0, 500));

    console.log('✨ Keywords generated successfully:', result.keywords);
    return Response.json(
      {
        success: true,
        data: {
          keywords: result.keywords,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error in keyword generation:', error);

    return Response.json(
      {
        success: false,
        error: 'failed to generate keywords',
      },
      { status: 200 }
    );
  }
}
