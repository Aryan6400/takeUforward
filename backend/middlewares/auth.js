import jwt from "jsonwebtoken";

async function auth(req, res, next){
    try {
        if(!req.headers.authorization) res.status(401).json({message: "Unauthorized request!"})
        const token = req.headers.authorization.split(" ")[1];
        const designation = req.headers.authorization.split(" ")[0];
        let decodedData;
        if(designation!="Bearer") res.status(401).json({message: "Unauthorized request!"})
        else if(token) {
            decodedData = jwt.verify(token, process.env.USER_SECRET);
            req.id = decodedData?.id;
        }
        next();
    } catch (error) {
        res.status(401).json({message: error.message});
        console.log(error);
    }
}

export default auth;
