import { connectDB } from "@utils/db";
import Prompt from "@models/prompt";
// GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const prompts = await Prompt.find({ tag: `#${params.tag}` }).populate('creator');
        if (!prompts) return new Response('Prompt not found ! ', { status: 404 });
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to get prompt', { status: 500 });
    }
}