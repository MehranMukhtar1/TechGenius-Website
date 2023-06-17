import Article from "../../../models/Article";
import connectDB from "../../../middlewares/connectDB";

const handler = async (req, res) => {

        if (req.method== "POST") {
        let article = await Article.findOneAndDelete({slug:req.body.slug});
        res.status(200).json({message: "Article Deleted Successfully"})
}
else {
                res.status(505).json({message: "Method Not Allowed"})

        }
       }

export default connectDB(handler);