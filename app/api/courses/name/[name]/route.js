import { mongooseConnect } from "@/lib/mongoose";
import { Courses } from "@/models/Courses";
async function handler(req, {params}) {
    const { method } = req;
    await mongooseConnect();
    if (method === "GET") {
        let name = params.name;
        let name1 = name + " 3.00"
        let name2 = name + " 4.00"
        let name3 = name + " 6.00"
        let name4 = name + " 1.00"
        //find the course with either name1 or name2
        const course = await Courses.findOne({$or: [{Name: name1}, {Name: name2}, {Name: name3}, {Name: name4}, {Name: name}]});
        return new Response(JSON.stringify(course), { status: 200 });
    }
}

export { handler as POST, handler as GET}
