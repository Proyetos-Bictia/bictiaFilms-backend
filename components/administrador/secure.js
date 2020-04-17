const auth = require('../../auth/index')

module.exports = function checkAuth(action){
    function middleware(req, res, next){
        switch(action){
            case 'createAdmin':
                auth.check.own(req);
                next()
                break;
            default:
                next();
        }
    }
    return middleware
}