import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Summary = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const dataa = JSON.parse(localStorage.getItem("allData"));
  const [data, setData] = useState(dataa);

  const [filteredData, setFiltterData] = useState([]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item, index) => index + 1 === Number(id));
      setFiltterData(filtered);
    } else {
      setFiltterData(data);
    }
  }, [data, id]);

  return (
    <div className="container">
      <h1>
        <center>Flight Schedule</center>
      </h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Flight No</th>
            <th scope="col">Airline Name</th>
            <th scope="col">TripType</th>
            <th scope="col">Departure Airport</th>
            <th scope="col">Arrived Airport</th>
            <th scope="col">Departure Date</th>
            <th scope="col">Return Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{id}</td>
              <td>{item.flightSchedule?.flightNo}</td>
              <td>{item.flightSchedule?.airlineName}</td>
              <td>{item.flightSchedule?.tripType}</td>
              <td>{item.flightSchedule?.departureAirport}</td>
              <td>{item.flightSchedule?.arrivedAirport}</td>
              <td>{item.flightSchedule.departureDate}</td>
              <td>{item.flightSchedule.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>
        <center>Ticket Purchase</center>
      </h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">FullName</th>
            <th scope="col">Cardnumber</th>
            <th scope="col">Payment DateTime</th>
            <th scope="col">Phone</th>
            <th scope="col">Month</th>
            <th scope="col">CVV</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{id}</td>
              <td>{item.ticketPurchase?.fullName}</td>
              <td>{item.ticketPurchase?.cardnumber}</td>{" "}
              <td>{item.ticketPurchase?.paymentDateTime}</td>{" "}
              <td>{item.ticketPurchase?.Phone}</td>{" "}
              <td>{item.ticketPurchase?.month}</td>{" "}
              <td>{item.ticketPurchase?.cvv}</td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
      <h1>
        <center>GST Details</center>
      </h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">GST No</th>
            <th scope="col">Company Name</th>
            <th scope="col">Company City</th>
            <th scope="col">Company State</th>
            <th scope="col">Company ZipCode</th>
            <th scope="col">Company Id</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{id}</td>
              <td>{item.gstDetails?.gstNumber}</td>
              <td>{item.gstDetails?.companyName}</td>
              <td>{item.gstDetails?.companyaddress.companyCity}</td>
              <td>{item.gstDetails?.companyaddress.companyState}</td>
              <td>{item.gstDetails?.companyaddress.companyZipcode}</td>
              <td>{item.gstDetails?.companyID}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>
        <center>Contact Information</center>
      </h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Phone</th>
            <th scope="col">Emergency Contact Number</th>
            <th scope="col">Emergency Contact Name</th>
            <th scope="col">Current Street</th>
            <th scope="col">Current State</th>
            <th scope="col">Current City</th>
            <th scope="col">Current Zipcode</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{id}</td>
              <td>{item.contactInformation?.mobilePhone}</td>
              <td>{item.contactInformation?.emergencyContactNumber}</td>
              <td>{item.contactInformation?.emergencyContactName}</td>
              <td>?{item.contactInformation?.currentaddress?.currentstreet}</td>
              <td>{item.contactInformation?.currentaddress?.currentState}</td>
              <td>{item.contactInformation?.currentaddress?.currentCity}</td>
              <td>{item.contactInformation?.currentaddress?.currentZipcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
