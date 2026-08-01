export default async function handler(req, res) {
    try {
        // Fetch the count securely from the server (bypassing browser adblockers)
        const response = await fetch('https://api.counterapi.dev/v1/karthigaiselvam-dev-portfolio/visits/up');
        
        if (!response.ok) {
            throw new Error(`CounterAPI responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Add CORS headers just to be safe
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        
        // Return the count to the frontend
        res.status(200).json(data);
    } catch (error) {
        console.error("Vercel Serverless Function Error:", error);
        res.status(500).json({ error: 'Failed to fetch visitor count' });
    }
}
