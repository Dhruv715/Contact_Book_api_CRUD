import React, { useEffect, useState } from "react";
import axios from "axios";

function ApiAction() {
  const [data, setData] = useState([]);
  const [pushState, setPushState] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    nickName: "",
  });
  const [updateId, setUpdateId] = useState(null);
  const token = {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTM0Mzc2MDExMDAtNTI2NTU4NzA0IiwiaWF0IjoxNzEzNDM3NjAxLCJleHAiOjE3MTM2MTA0MDF9.cyNhopUX9KNMS78SBI5ZfUDGtw_RGP74LOwWTgDUTog",
    },
  };
  const getData = () => {
    axios
      .get("https://service.apikeeda.com/contact-book", token)
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const handleChanger = (e) => {
    setPushState({
      ...pushState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(pushState);
    if (updateId) {
      axios
        .patch(
          `https://service.apikeeda.com/contact-book/${updateId}`,
          pushState,
          token
        )
        .then(function (response) {
          getData();
          setUpdateId(null); // Reset updateId after updating
          setPushState({
            firstName: "",
            lastName: "",
            mobileNo: "",
            email: "",
            nickName: "",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      axios
        .post("https://service.apikeeda.com/contact-book", pushState, token)
        .then(function (response) {
          // handle success`
          console.log(response.data.data);
          getData();
          setPushState({
            firstName: "",
            lastName: "",
            mobileNo: "",
            email: "",
            nickName: "",
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://service.apikeeda.com/contact-book/` + id, token)
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        getData();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const handleUpdate = (id) => {
    setUpdateId(id);
    // console.log(id);
    const responseData = data.find((data) => data._id === id);
    console.log(responseData);
    setPushState({
      firstName: responseData.firstName,
      lastName: responseData.lastName,
      mobileNo: responseData.mobileNo,
      email: responseData.email,
      nickName: responseData.nickName,
    }); 
  };

  // method ::: 2

  // const handleUpdate = (id) => {
  //   setUpdateId(id);
  //   const responseData = data.find((item) => item._id === id);
  //   console.log(responseData);
  //   const { firstName, lastName, mobileNo, email, nickName } = responseData;
  //   setPushState({ firstName, lastName, mobileNo, email, nickName });
  // };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <form className="formBox">
        <input
          type="text"
          name="firstName"
          placeholder="Enter First Name"
          value={pushState.firstName}
          onChange={handleChanger}
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="Enter Lastname"
          value={pushState.lastName}
          onChange={handleChanger}
        />
        <br />
        <input
          type="text"
          name="mobileNo"
          placeholder="Enter Mobile Number"
          value={pushState.mobileNo}
          onChange={handleChanger}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Enter Email Here.."
          value={pushState.email}
          onChange={handleChanger}
        />
        <br />
        <input
          type="text"
          name="nickName"
          placeholder="Enter Nickname Here.."
          value={pushState.nickName}
          onChange={handleChanger}
        />
        <br />
        <button onClick={handleSubmit}>Submit Data</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Fname</th>
            <th>Lname</th>
            <th>email</th>
            <th>Mobile</th>
            <th>Nickname</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.mobileNo}</td>
              <td>{item.nickName}</td>
              <td>
                <button onClick={() => handleUpdate(item._id)}>Update</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ApiAction;
