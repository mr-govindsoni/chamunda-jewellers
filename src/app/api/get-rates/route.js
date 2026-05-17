import { NextResponse } from 'next/server';

export async function GET() {
  const symbols = ['XAU/INR', 'XAG/INR', 'XAU/USD', 'XAG/USD'];
  
  // Fallback mock data in case of API rate limits
  const mockData = {
    'XAU/INR': { price: 222300, currency: 'INR', ch: 12.50 },
    'XAG/INR': { price: 2609000, currency: 'INR', ch: -120.00 },
    'XAU/USD': { price: 2394.40, currency: 'USD', ch: 5.20 },
    'XAG/USD': { price: 28.31, currency: 'USD', ch: -0.12 }
  };

  try {
    const fetchPromises = symbols.map(symbol => 
      fetch(`https://www.goldapi.io/api/${symbol}`, {
        method: 'GET',
        headers: {
          'x-access-token': process.env.GOLD_API_KEY,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }).then(res => {
        if (!res.ok) {
           throw new Error(`Failed to fetch ${symbol}`);
        }
        return res.json();
      })
    );

    const results = await Promise.all(fetchPromises);
    
    const rates = {
      'XAU/INR': results[0],
      'XAG/INR': results[1],
      'XAU/USD': results[2],
      'XAG/USD': results[3],
    };

    return NextResponse.json(rates);
  } catch (error) {
    console.error("Error fetching gold rates, using fallback data:", error.message);
    // Return fallback data to prevent the UI from breaking
    return NextResponse.json(mockData);
  }
}
