const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('auth-token'); //check header once
    if(!token){
        res.send('Please Login!')
    }
    else{
        try{
            const verified = jwt.verify(token, "ThisIsTopSecret");
            req.user = verified;
            next()
        }
        catch(err){
            res.send('Invalid Token')
        }
        
    }
    
}
