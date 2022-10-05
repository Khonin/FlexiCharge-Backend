from urllib import response
import requests
import pytest

class TestApiChargers:

    def test_api_status_code(self):
        r = requests.get("http://18.202.253.30:8080/chargers")
        assert r.status_code ==200, "Status code is not 200"

    def test_api_encoding(self):
        r = requests.get("http://18.202.253.30:8080/")
        assert r.encoding == "utf-8", "Encoding is not utf-8"
    
    
    #The way I've learnet is that test should be simple and only test one thing, so using 2 asserts might be wrong
    def test_chargerid_exists(self, chargerid = "100009"):
        
        url = "http://18.202.253.30:8080/chargers/" + str(chargerid)

        r = requests.get(url)

        #If the response code is 200 this code will execute
        response_body = r.json()
        got_id = response_body['chargerID']
        # The actual test.
        assert got_id == chargerid, f"Returned ChargerID does not match the one supplied. expected: {chargerid} got: {got_id}"
            
    
    
    #In order to run this test we need a bearer auth token retrieved when logging into the system.
    def test_post_charger(self):
        #Arrange
        url = "http://18.202.253.30:8080/chargers"
        payload = {
                "chargerPointNumber": 24,
                "location": [57.777714, 14.16301],
                "serialNumber": "android"
                }
        headers = {"Authorization": "Bearer"}
        
        #Act
        request = requests.post(url, json=payload, headers=headers)
        
        #Asserts
        print(request.status_code)
        assert request.status_code == 200, "Status code is not 200"

        
        
        # TODO: Ensure that we only do these types of test on local database in a docker container or something so we dont mess with the production env?
        # TODO: 
        #       *  assert that charger X does NOT exists
        #       *  create charger X
        #       *  assert that charger X DOES exists

    
        
    def test_chargerid_exists_status_code(self, chargerid = "100009"):
        url = f"http://18.202.253.30:8080/chargers/{chargerid}"
        r = requests.get(url)

        assert r.status_code == 200, "Charger with id: " + chargerid + " does not exist."   
    
    def test_charger_does_not_exist_status_code(self, chargerid="10009"):
        url = f"http://18.202.253.30:8080/chargers/{chargerid}"
        r = requests.get(url)

        assert r.status_code == 404, "Charger with id: " + chargerid + " exists." 
        
        
    #Function to test if charger is available
    #DOESNT WORK PROPERLY
    def test_charger_status_is_available(self, chargerid = "100009"):
        url = f"http://18.202.253.30:8080/chargers/{chargerid}"
        r = requests.get(url)
 
        status = r.json()["status"]
        assert status == "Available", f"Charger is not available {status}"

        
        
    def test_charger_serialnmbr(self, serial_number = "testnumber15"):
        url = f"http://18.202.253.30:8080/chargers/serial/{serial_number}"
        r = requests.get(url)

        got_serial = r.json()["serialNumber"]
        assert got_serial == serial_number, f"Serial number does not exist got {got_serial} != expected {serial_number}"
        