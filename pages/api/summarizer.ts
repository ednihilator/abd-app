import { NextApiRequest, NextApiResponse } from 'next';
import { extract } from "@extractus/article-extractor";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('API Route Hit'); // Debug log

    if (req.method === 'POST') {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "No URL provided" });
        }

        try {
            const page = await extract(url);

            if (page) {
                const { title, content } = page;
                return res.status(200).json({ title, content });
            } else {
                return res.status(500).json({ error: "Could not extract article" });
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            return res.status(500).json({ error: "Internal server error" });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}


// curl http://localhost:3000/api/summarizer <---test me using this

// curl -X POST -H "Content-Type: application/json" -d '{"url":"https://www.sandmarc.com/pages/iphone-photography-tips-and-tricks-for-iphone-15-and-14-pro"}' http://localhost:3000/api/summariser



