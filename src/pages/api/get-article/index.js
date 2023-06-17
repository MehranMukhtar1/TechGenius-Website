import Article from "../../../models/Article";
import connectDB from "../../../middlewares/connectDB";

const handler = async (req, res) => {

        let article = await Article.find({slug:req.body.slug});
        res.status(200).json({article})
       }

export default connectDB(handler);