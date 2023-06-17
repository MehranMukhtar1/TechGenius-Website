import Comment from "../../../models/Comment";
import connectDB from "../../../middlewares/connectDB";

const handler = async (req, res) => {
        if (req.method == "POST") {
                console.log(req.body.slug)
        let comments = await Comment.find({blogSlug:req.body.slug});
        res.status(200).json({comments})
        }
       }

export default connectDB(handler);