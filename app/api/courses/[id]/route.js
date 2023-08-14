import { mongooseConnect } from "@/lib/mongoose";
import { Courses } from "@/models/Courses";
async function handler(req, {params}) {
    const { method } = req;
    await mongooseConnect();
    if (method === "GET") {
        //find the course with the id in the url
        const course = await Courses.findOne({ _id: params.id });
        return new Response(JSON.stringify(course), { status: 200 });
    }
}

export { handler as POST, handler as GET}
