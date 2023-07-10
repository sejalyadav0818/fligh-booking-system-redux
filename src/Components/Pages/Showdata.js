import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletee } from "../../redux/action";
const Showdata = () => {
    const dispatch = useDispatch();
  const dataa = JSON.parse(localStorage.getItem("allData"));
  const [data, setData] = useState(dataa);
  console.log(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);
  useEffect(() => {
    const storedData = localStorage.getItem("allData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const { firstname, lastname, email, phone,address } = item.basicDetails;
    const searchValue = searchTerm.toLowerCase();
    return (
      firstname.toLowerCase().includes(searchValue) ||
      lastname.toLowerCase().includes(searchValue) ||
      email.toLowerCase().includes(searchValue) ||
      phone.includes(searchTerm) ||
      address.city.includes(searchTerm) ||
      address.state.includes(searchTerm) 
    );
  });

  filteredData.sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      if (a.basicDetails[sortConfig.key] < b.basicDetails[sortConfig.key]) {
        return -1;
      }
      if (a.basicDetails[sortConfig.key] > b.basicDetails[sortConfig.key]) {
        return 1;
      }
      return 0;
    } else if (sortConfig.direction === "descending") {
      if (a.basicDetails[sortConfig.key] > b.basicDetails[sortConfig.key]) {
        return -1;
      }
      if (a.basicDetails[sortConfig.key] < b.basicDetails[sortConfig.key]) {
        return 1;
      }
      return 0;
    }
    return 0;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(pageNumber);
  };

  // const handleDelete = (index) => {
  //   console.log(index);
  //   const updatedData = [...data];
  //   updatedData.splice(index, 1);
  //   setData(updatedData);
  //   localStorage.setItem("allData", JSON.stringify(updatedData));
  // };
 const handleDelete = (index) => {
    console.log(index);
    ;
    const updatedData = [...data];
    dispatch(deletee(index))
    updatedData.splice(index, 1);
    setData(updatedData);
    localStorage.setItem("allData", JSON.stringify(updatedData));
  };

  // const editData = (index) => {
  //    console.log(index);
  //   const updatedData = [...allData];
  //   console.log(updatedData);
  //   updatedData.splice(index, 1);
  //   setData(updatedData);
  // };
  // const editData = (index) => {
  //   console.log(index);
  //   const updatedData = [...allData];
  //   console.log(updatedData);
  //   updatedData.splice(index, 1);
  //   setData(updatedData);
  // }

    // // const id = index + 1;
    useEffect(() => {
      const fetchData = async (index) => {
        try {
          const response = await fetch(`/?id=${index + 1}}`);
          const data = await response.json();
          const updatedData = [...data];
          console.log(updatedData);
          updatedData.splice(index, 1);
          setData(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    });

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col" onClick={() => handleSort("firstname")}>
              Firstname
              {sortConfig.key === "firstname" && (
                <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("lastname")}>
              Lastname
              {sortConfig.key === "lastname" && (
                <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("email")}>
              Email
              {sortConfig.key === "email" && (
                <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("phone")}>
              Phone
              {sortConfig.key === "phone" && (
                <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("city")}>
              Phone
              {sortConfig.key === "city" && (
                <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("state")}>
              Phone
              {sortConfig.key === "phone" && (
                <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>
              )}
            </th>
            <th scope="col">Street</th>
            <th scope="col">State</th>
            <th scope="col">City</th>
            <th scope="col">Zip</th>
            <th scope="col">Gender</th>
            <th scope="col" colSpan={2}>
              Action
            </th>
            <th>view</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item, index) => (
            <tr key={index}>
              {/* <td>{index + 1}</td> */}
              <td>{item.basicDetails.firstname}</td>
              <td>{item.basicDetails.lastname}</td>
              <td>{item.basicDetails.email}</td>
              <td>{item.basicDetails.phone}</td>
              <td>{item.basicDetails.address.street}</td>
              <td>{item.basicDetails.address.state}</td>
              <td>{item.basicDetails.address.city}</td>
              <td>{item.basicDetails.address.zipCode}</td>
              <td>{item.basicDetails.gender}</td>
              <td>
                <button>
                    <Link to={`/?id=${index + 1}`}>edit</Link>
                  </button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
              <td>
                <td>
                  {/* <button type="button" onClick={() => editData(index + 1)}>
                    <Link to={`/?id=${index + 1}`}>edit</Link>
                  </button> */}
                </td>
              </td>
              <td>
                <button>
                  {" "}
                  <Link to={`/summary?id=${index + 1}`}>view</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <ul>
          {Array.from({
            length: Math.ceil(filteredData.length / recordsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => paginate(index + 1)}>
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Showdata;
