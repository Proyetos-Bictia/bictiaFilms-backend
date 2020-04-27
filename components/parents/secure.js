const auth = require('../../auth/index')

module.exports = function checkAuth(action){
    function middleware(req, res, next){
        switch(action){
            case 'createChild':
                const owner = req.body.parent
                auth.check.idAndRol(req, owner);
                next()
                break;
            case 'deleteParent':
                const idParent = req.params.id
                auth.check.idAndRol(req,idParent);
                next();
                break;
            default:
                next();
        }
    }
    return middleware
}