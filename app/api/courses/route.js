import { mongooseConnect } from "@/lib/mongoose";
import { Courses } from "@/models/Courses";
async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();
    if (method === "GET") {
        const courses = await Courses.find({});
        return new Response(JSON.stringify(courses), { status: 200 });
    }
}

export { handler as POST, handler as GET}
