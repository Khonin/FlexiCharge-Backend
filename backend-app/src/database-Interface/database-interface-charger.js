module.exports = function({ dataAccessLayerCharger, dbErrorCheck, validationErrors }) {

    const exports = {}


    exports.getChargers = function(callback) {
        dataAccessLayerCharger.getChargers(function(error, chargers) {
            if (Object.keys(error).length > 0) {
                dbErrorCheck.checkError(error, function(errorCode) {
                    callback(errorCode, [])
                })
            } else {
                callback([], chargers)
            }
        })
    }

    exports.getCharger = function(chargerID, callback) {
        dataAccessLayerCharger.getCharger(chargerID, function(error, charger) {
            if (Object.keys(error).length > 0) {
                dbErrorCheck.checkError(error, function(errorCode) {
                    callback(errorCode, [])
                })
            } else {
                if (charger == null) {
                    callback([], [])
                } else {
                    callback([], charger)
                }

            }
        })
    }


    exports.getChargerBySerialNumber = function(serialNumber, callback) {
        const validationError = validationErrors.getChargerBySerialNumberValidation(serialNumber)
        if(validationError.length > 0){
            callback(validationError, null)
        }else{
            dataAccessLayerCharger.getChargerBySerialNumber(serialNumber, function(error, charger) {
                if (Object.keys(error).length > 0) {
                    dbErrorCheck.checkError(error, function(errorCode) {
                        callback(errorCode, [])
                    })
                } else {
                    if (charger == null) {
                        callback([], [])
                    } else {
                        callback([], charger)
                    }

                }
            })
        }
    }


    exports.getAvailableChargers = function(callback) {
        dataAccessLayerCharger.getAvailableChargers(function(error, chargers) {
            if (Object.keys(error).length > 0) {
                dbErrorCheck.checkError(error, function(errorCode) {
                    callback(errorCode, [])
                })
            } else {
                callback([], chargers)
            }
        })
    }

    exports.addCharger = function(chargePointId, serialNumber, location, callback) {
        const ValidationError = validationErrors.getAddChargerValidation(location, serialNumber)
        if(ValidationError.length > 0){
            callback(ValidationError, null)
        }else{
            dataAccessLayerCharger.addCharger(chargePointId, serialNumber, location, function(error, chargerId) {
                if (Object.keys(error).length > 0) {
                    dbErrorCheck.checkError(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, [])
                    })
                } else {
                    callback([], chargerId)
                }
            })
        }
    }

    exports.removeCharger = function(chargerId, callback) {
        dataAccessLayerCharger.removeCharger(chargerId, function(error, chargerRemoved) { //chargerRemoved = bool
            if (Object.keys(error).length > 0) {
                dbErrorCheck.checkError(error, function(errorCode) {
                    callback(errorCode, chargerRemoved)
                })
            } else {
                callback([], chargerRemoved)
            }
        })
    }


    exports.updateChargerStatus = function(chargerId, status, callback) {
        const validationError = validationErrors.getUpdateChargerStatusValidation(status)
        if(validationError.length > 0){
            callback(validationError, null)
        }else{
            dataAccessLayerCharger.updateChargerStatus(chargerId, status, function(error, charger) {
                if (Object.keys(error).length > 0) {
                    dbErrorCheck.checkError(error, function(errorCode) {
                        callback(errorCode, [])
                    })
                } else {
                    callback([], charger)
                }
            })
        }  
    }

    return exports
}