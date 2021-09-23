var express = require('express')
const AuthMiddleware = require('./middleware/auth.middleware')
const authMiddleware = new AuthMiddleware()

module.exports = function ({ databaseInterfaceTransactions }) {

    const router = express.Router()

    router.get('/:id', function (request, response) {
        const transactionId = request.params.id
        databaseInterfaceTransactions.getTransaction(transactionId, function (errors, transaction) {
            if (errors.length == 0 && transaction.length == 0) {
                response.status(404).end()
            } else if (errors.length == 0) {
                response.status(200).json(transaction)
            } else {
                response.status(500).json(errors)
            }
        })
    })

    router.get('/userTransactions/:userID', function(request, response){
        const userId = request.params.userID
        databaseInterfaceTransactions.getTransactionsForUser(userId, function(errors, userTransaction){
            if(errors.length == 0 && userTransaction.length == 0){
                response.status(404).end()
            }else if(errors.length == 0){
                response.status(200).json(userTransaction)
            }else{
                response.status(500).json(errors)
            }
        })
    })

    router.get('/chargerTransactions/:chargerID', function(request, response){
        const chargerId = request.params.chargerID
        databaseInterfaceTransactions.getTransactionsForCharger(chargerId, function(errors, chargerTransaction){
            if(errors.length == 0 && chargerTransaction.length == 0){
                response.status(404).end()
            }else if(errors.length == 0){
                response.status(200).json(chargerTransaction)
            }else{
                response.status(500).json(errors)
            }
        })
    })

    
    router.post('/', function (request, response) {
    
    })
    

    router.put('/payment/:transactionID', function (request, response) {
        
    })



    router.put('/meter/:transactionID', function (request, response) {
        const transactionId = request.params.transactionID
        const meterValue = request.body.meterStop
        databaseInterfaceTransactions.updateTransactionMeter(transactionId, meterValue, function(error, updateTransactionMeter){
            if (error.length == 0) {
                response.status(201).json(updateTransactionMeter)
            } else {
                if (error.includes("internalError") || error.includes("dbError")) {
                    response.status(500).json(error)
                } else {
                    response.status(404).json(error)
                }
            }
        })
    })

    return router
}