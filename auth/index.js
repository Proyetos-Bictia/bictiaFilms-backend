const jwt = require('jsonwebtoken')

function sign(data){
    return jwt.sign(data, 'secreto')
}

function verify(token){
    return jwt.verify(token, 'secreto')
}

const check = {
    own: function(req){
        const decode = decodeHeader(req)
        console.log('token decifrado ==>', decode);

        if(decode.rol !== 'ROL_ADMIN'){
            throw new Error('No puedes hacer esto querido -')
        }
    },
    
    idAndRol: function(req,owner){
        const decode = decodeHeader(req)
        console.log('token decifrado desde idandrol ===> ', decode);
        if(decode.rol !== 'ROL_PARENT' || decode.id !== owner){
            throw new Error('No puedes hacer esto querido *')
        }
    }
}

function getToken(auth){
    if(!auth){
        throw new Error('No viene token')
    }

    let token = auth.replace('Bearer ', '')

    if(auth.indexOf('Bearer ') === -1){
        throw new Error ('Formato invalido')
    }
    return token
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decode = verify(token);

    return decode
}

module.exports = {
    sign,
    check
}