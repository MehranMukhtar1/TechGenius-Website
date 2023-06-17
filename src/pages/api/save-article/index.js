import Article from "../../../models/Article";
import connectDB from "../../../middlewares/connectDB";

const handler = async (req, res) => {
        if (req.method == "POST") {
        let article = new Article({
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content,
            poster: req.body.poster,
            author: req.body.author
            })
        await article.save();
        res.status(200).json({message: "Article Added Successfully"})
    }
    else 
    {
               res.status(505).json({message: "Method Not Allowed"})
    
           }
}

export default connectDB(handler);