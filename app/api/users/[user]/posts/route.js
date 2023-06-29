import { connectDB } from "@utils/db";

import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const user = await User.findOne({ username: params.user });
        const prompts = await Prompt.find({ creator: user._id }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 });

    } catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 });
    }
}

