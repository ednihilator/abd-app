// import { extract } from "@extractus/article-extractor";

// export async function POST (Request: Request) {
//     const body = await Request.json();
//     const { url } = body;

// if (!url) {
//         return Response.json({ error: "No URL provided" }, { status: 400 });
//     }

//     try {
//         const page = await extract(url);
    
//         if (page) {
//             const { title, content } = page;
//             return Response.json({ title, content });
//         } else {
//             return Response.json({ error: "Could not extract article"}, { status: 500 })
//         }
//     } catch (error) {
//         return Response.json({ error }, { status: 500 });
//     }
// }

import { NextResponse } from 'next/server';
import { extract } from "@extractus/article-extractor";

export async function POST(request: Request) {
    console.log('API Route Hit'); // Debug log

    const body = await request.json();
    const { url } = body;

    if (!url) {
        return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    try {
        const page = await extract(url);
    
        if (page) {
            const { title, content } = page;
            return NextResponse.json({ title, content });
        } else {
            return NextResponse.json({ error: "Could not extract article" }, { status: 500 });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

