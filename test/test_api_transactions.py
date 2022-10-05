import requests
import pytest

class TestApiTransactions:
    
    def test_transaction_status_code(self, transactionID = "947"):
        
        url = "http://18.202.253.30:8080/transactions/" + transactionID
        
        r = requests.get(url)
        
        r.json()
        
        print(r)
        assert requests.get(url).status_code == 200, "Status code is not 200"
        
        
        
    #TODO
    #Currently only checks if transactions exists with the userID
    def test_transaction_by_userId(self):
        
        userId = "10"
        
        url = "http://18.202.253.30:8080/transactions/userTransactions/" + userId
       
        r = requests.get(url)
       
        response = r.json()
       
        assert r.status_code == 200, "Status code is not 200"
    

    def test_post_transaction(self):
        
        #Arrange
        url = "http://18.202.253.30:8080/transactions"

        payload = {
                    "userID": "111",
                    "chargerID": 100009,
                    "isKlarnaPayment": True,
                    "pricePerKwh": "333"
                   }
        
        #Act
        request = requests.post(url, json=payload)
        
        #Assert
        #Return 201 status code, meaning it has been created.
        #It also returns the transactionID
        assert request.status_code == 201, "Status code is not 201"    

        
