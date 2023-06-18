import Article from "../../../models/Article";
import connectDB from "../../../middlewares/connectDB";

const handler = async (request, response) => {
    if (request.method == "POST") {
    const searchValue = request.body.searchValue;

        let articles = await Article.find({title:{$regex : searchValue}})
    
        return response.status(200).json({articles})
  
}
else {

    return response.status(400).json({message: "ERROR"})
    }
}


export default connectDB(handler); 