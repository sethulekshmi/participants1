'use strict';

const Util = require('./util.js');
const hfc = require('hfc');

class Asset {

    constructor(usersToSecurityContext) {
        this.usersToSecurityContext = usersToSecurityContext;
        this.chain = hfc.getChain('myChain'); //TODO: Make this a config param?
    }

    create(userId) {
        let securityContext = this.usersToSecurityContext[userId];
        let assetID = Asset.newAssetID();

        return this.doesAssetIDExist(userId, assetID)
        .then(function() {
            return Util.invokeChaincode(securityContext, 'create_asset', [ assetID ])
            .then(function() {
                return assetID;
            });
        });
    }

    transfer(userId, buyer, functionName, assetID) {
        return this.updateAttribute(userId, functionName , buyer, assetID);
    }

    updateAttribute(userId, functionName, value, assetID) {
        let securityContext = this.usersToSecurityContext[userId];
        return Util.invokeChaincode(securityContext, functionName, [ value, assetID ]);
    }

    doesAssetIDExist(userId, assetID) {
        let securityContext = this.usersToSecurityContext[userId];
        return Util.queryChaincode(securityContext, 'check_unique_assetID', [ assetID ]);
    }

    static newAssetID() {
        let numbers = '1234567890';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let assetID = '';
        for(let i = 0; i < 7; i++)
            {
            assetID += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        assetID = characters.charAt(Math.floor(Math.random() * characters.length)) + assetID;
        assetID = characters.charAt(Math.floor(Math.random() * characters.length)) + assetID;
        return assetID;
    }
}

module.exports = Asset;
