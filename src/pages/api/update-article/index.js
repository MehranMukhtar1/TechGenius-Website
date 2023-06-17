import Article from "../../../models/Article";
import connectDB from "../../../middlewares/connectDB";
const handler = async (request, response) => {
    const id = 
    await Article.updateOne(
    { "_id": request.body._id },
     {
        $set: { "title": request.body.title, "slug": request.body.slug,
        "content": request.body.content,  
        "poster": request.body.poster,
        "author": request.body.author
    
    } 
     }
    );

    return response.status(200).json({type: "success", message: "Article Updated successfully"})
    
}


export default connectDB(handler);