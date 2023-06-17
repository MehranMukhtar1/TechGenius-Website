import Comment from "../../../models/Comment";
import connectDB from "../../../middlewares/connectDB";

const handler = async (req, res) => {
        if (req.method == "POST") {
        let comment = new Comment({
            name: req.body.name,
            blogSlug: req.body.slug,
            content: req.body.content
            })
        await comment.save();
        res.status(200).json({message: "Comment Added Successfully", type:"success"})
    }
    else 
    {
               res.status(505).json({message: "Method Not Allowed"})
    
           }
}

export default connectDB(handler);