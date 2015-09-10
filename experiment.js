var bitcore = require('bitcore')
delete global._bitcore
var Message = require('bitcore-message'),
    base64url = require('base64url'),
    EC = require('elliptic').ec,
    ec = new EC('secp256k1'),
    decompressPublicKey = require('blockchain-auth').utils.decompressPublicKey,
    KeyEncoder = require('key-encoder').KeyEncoder,
    SECP256k1Parameters = require('key-encoder').SECP256k1Parameters

var privateKeyBitcore = bitcore.PrivateKey(),
    privateKeyHex = privateKeyBitcore.toString(),
    publicKeyBitcore = privateKeyBitcore.toPublicKey(),
    publicKeyHex = publicKeyBitcore.toString(),
    message = 'hello, world',
    keyEncoder = new KeyEncoder(SECP256k1Parameters)

console.log(privateKeyHex)
console.log(publicKeyHex)

var decompressedPublicKey = decompressPublicKey(publicKeyHex)
console.log(decompressedPublicKey)

var privateKeyEC = ec.keyFromPrivate(privateKeyHex, 'hex')
console.log(privateKeyEC)

var publicKeyEC = ec.keyFromPublic(decompressedPublicKey, 'hex')
console.log(publicKeyEC)

var signature = privateKeyEC.sign(message)
console.log(signature)

//console.log(signature.toString())

var derSign = signature.toDER()

var derHex = new Buffer(derSign).toString('hex')

var base64signature = new Buffer(signature.r.toString(), 16).toString('base64')
console.log(base64signature)

var messageIsValid = publicKeyEC.verify(message, derSign)

console.log(messageIsValid)

//var signature = privateKeyEC.sign(message)

//console.log(signature)

/*console.log(publicKeyHex)


var signature = Message(message).sign(privateKey)

console.log(signature)
console.log(signature.length)

var shortSignature = base64url.fromBase64(signature).slice(1)

console.log(shortSignature)
console.log(shortSignature.length)

var  = ec.keyFromPublic(publicKeyHex, 'hex')*/

//ecKeyPair.verify(message, shortSignature)
