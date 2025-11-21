const jwt = require("jsonwebtoken");

//next->function that lets request move to next handler
module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    //req.headers.authorization → reads the Authorization header
    //?. → optional chaining (if header is missing, avoid crashing)
    //.split(" ") → splits "Bearer token" into ["Bearer", "token"]
    //[1] → selects the second part, which is the actual token

    //ex) ->  Authorization: Bearer eyJh...123
    // here token=eyJh...123
    if (!token)
        return res.status(401).json({ message: "Token missing" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        //checks token is valid,
        //checks signature matches,
        //checks token is not expired.

        /*
        decoded payload
        {
            "id": "45nf5g5e",
            "email": "test@gmail.com",
            "iat": 17100000,
            "exp": 17136000
        }

        */
        req.user = decoded;//Attaches the decoded payload to the request
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
