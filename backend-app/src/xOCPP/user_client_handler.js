
module.exports = function ({ constants, func, broker, v }) {
    const c = constants.get()

    exports.handleClient = function (clientSocket, userID) {
        v.addConnectedUserSocket(userID, clientSocket)

        clientSocket.on('close', function disconnection() {
            const transactionID = v.getTransactionIDwithUserID(userID)
            v.removeLastLiveMetricsTimestamp(transactionID)
            v.removeConnectedUserSocket(userID)
            broker.unsubscribeToLiveMetrics(userID)

            
            /** v.removeUserID(userID) is only called when StopTransaction is called, so if a charger crashes, or a transaction is never stops; we will have a memory leak.
             ** However, in that case, a memory leak is not the  biggest problem ;) */ 
           

            console.log("Disconnected from client with ID: " + userID)
            console.log("Number of connected user clients: " + v.getLengthConnectedUserSockets()  + ' (' + v.getUserIDsLength() + ')' + ' (' + v.getLiveMetricsTokensLength() + ')' + ' (' + v.lengthLastLiveMetricsTimestamps() + ')')
        })

        broker.subcribeToLiveMetrics(userID, function(error){
            if(error.length > 0){
                console.log("User client with ID: " + userID + " couldn't connect to the system.")
                const message = func.buildJSONMessage([c.CALL_ERROR, 1337, c.INTERNAL_ERROR, "Couldn't subscribe to live metrics", {}])
                clientSocket.send(message)
                clientSocket.terminate()
            } else {
                console.log("User client with ID: " + userID + " connected to the system.")
                console.log("Number of connected user clients: " + v.getLengthConnectedUserSockets())
            }
        })
    }

    return exports
}