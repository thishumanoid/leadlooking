export async function getKeywords(description: string): Promise<string[]> {
  try {
    const response = await fetch('/api/campaign/generate-keywords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productDescription: description }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate keywords');
    }

    const responseData = await response.json();
    
    // 🔍 Debug log to see the exact structure
    console.log('API Response:', responseData);

    // ❌ OLD (Incorrect): return data.keywords || [];
    // ✅ NEW (Correct): Access data.keywords inside the 'data' object
    const keywords = responseData.data?.keywords || [];
    
    console.log(`✓ Generated ${keywords.length} keywords`);
    
    return keywords;
  } catch (error) {
    console.error('Failed to generate keywords:', error);
    // Return empty array instead of throwing to prevent crashing the UI flow
    return []; 
  }
}