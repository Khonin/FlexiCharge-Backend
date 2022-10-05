import requests
import pytest

class TestApiReservations:
    
    def test_reservation_status_code(self):
        r = requests.get("http://18.202.253.30:8080/reservations")
        assert r.status_code ==200, "Status code is not 200"
        

    
    
        
        