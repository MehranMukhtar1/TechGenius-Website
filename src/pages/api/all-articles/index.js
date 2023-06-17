import Article from "../../../models/Article";
import connectDB from "../../../middlewares/connectDB";

const handler = async (req, res) => {

        let articles = await Article.find({});
        res.status(200).json({articles})
       }

export default connectDB(handler);