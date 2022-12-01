import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users",
});

const initObj = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
};

const App = () => {
  // const [id, setID] = useState("");
  const [posts, setPosts] = useState([]);
  const [empModal, setEmpModal] = useState(initObj);

  // GET with Axios
  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      let response = await client.get();
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE with Axios
  const deletePost = async (item) => {
    if (window.confirm("Do you want to remove Employee detail ?")) {
      try {
        await client.delete(`${item.id}`);
        const foundIndex = posts.findIndex((post) => post.id === item.id);
        posts.splice(foundIndex, 1);
        setPosts([...posts]);
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // create new for delete

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // POST with Axios
  const onSave = async () => {
    try {
      const mode = !empModal.id ? "add" : "edit";
      console.log(empModal);
      if (mode === "add") {
        // let response = await client.post(empModal);
        posts.push({ ...empModal, id: posts.length + 200 + 1 });
      } else {
        // let response = await client.put(empModal);
        const foundIndex = posts.findIndex((item) => item.id === empModal.id);
        posts.splice(foundIndex, 1, empModal);
      }
      console.log(posts);
      setPosts([...posts]);
      setEmpModal(initObj);
    } catch (error) {
      console.log(error);
    }
  };  

  // modal state
  const [show, setShow] = useState(false);
  const [viewDataModel, setViewDataModel] = useState(false);
  const handleClose = () => {
    console.log("data on submit button");
    console.log(empModal);
    setShow(false);
  };
  const handleShow = () => {
    setEmpModal(initObj);
    setShow(true);
  };
  const handleViewClose = () => {
    setViewDataModel(false);
  };

  const viewData = (data) => {
    console.log(" view data info: ===>", posts);
    setViewDataModel(true);
    setEmpModal(data);
  };

  const onEditData = (data) => {
    setShow(true);
    setEmpModal(data);
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setEmpModal({ ...empModal, [name]: value });
  };

  return (
    <>
      <nav className="title-name">
        <h3>Employee Details</h3>
      </nav>
      <Container>
        <div className="app">
          {/* modal start here  */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Employee Details Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="add-post-container">
                <form className="row form-group" onSubmit={handleSubmit}>
                  <div className="col-6 my-3">
                    <label>Enter First Name</label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={empModal.name}
                      onChange={onValueChange}
                    />
                  </div>
                  <div className="col-6 my-3">
                    <label>Enter Last Name</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={empModal.username}
                      onChange={onValueChange}
                    />
                  </div>
                  <div className="col-6 my-3">
                    <label>Enter Email Id</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={empModal.email}
                      onChange={onValueChange}
                    />
                  </div>
                  <div className="col-6 my-3">
                    <label>Enter Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={empModal.phone}
                      onChange={onValueChange}
                    />
                  </div>
                  <div className="col-12 my-3">
                    <label>Enter website</label>
                    <input
                      type="text"
                      name="website"
                      className="form-control"
                      value={empModal.website}
                      onChange={onValueChange}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={() => {
                      handleClose();
                      onSave();
                    }}
                  >
                    Submite
                  </button>
                </form>
              </div>
            </Modal.Body>
          </Modal>
          {/* modal end here  */}

          {/* view detail modal start here  */}
          <Modal
            show={viewDataModel}
            onHide={handleViewClose}
            className="view-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Show Employee Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="add-post-container view-modal-details">
                <form className="row form-group">
                  <div className="col-12 d-flex">
                    <span className="me-2">First Name :</span>
                    <p> {empModal.name}</p>
                  </div>
                  <div className="col-12 d-flex">
                    <span className="me-2"> Last Name : </span>
                    <p>{empModal.username}</p>
                  </div>
                  <div className="col-12 d-flex">
                    <span className="me-2"> Email Id :</span>
                    <p>{empModal.email}</p>
                  </div>
                  <div className="col-12 d-flex">
                    <span className="me-2"> Phone Number :</span>
                    <p>{empModal.phone}</p>
                  </div>
                  <div className="col-12 d-flex">
                    <span className="me-2"> website :</span>
                    <p>{empModal.website}</p>
                  </div>
                  {/* <button type="submit" onClick={handleClose}>Submite</button> */}
                </form>
              </div>
            </Modal.Body>
          </Modal>
          {/* modal end here  */}

          <div className="posts-container">
            <div className="add-new-emp">
              <Button
                variant="primary"
                className="edit-emp-btn"
                onClick={handleShow}
              >
                <img src="./add.png" className="add-btn" alt="" /> Add new
                Employee
              </Button>
            </div>
            <div className="employe-header">
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Action</th>
                  </tr>
                </thead>

                {posts.map((post, index) => {
                  return (
                    <tbody key={post.id}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{post.name}</td>
                        <td>{post.username}</td>
                        <td>{post.email}</td>
                        <td>{post.phone}</td>
                        <td>{post.website}</td>
                        <td>
                          <div className="all-button">
                            <div
                              className="all-btn view-btn me-2"
                              onClick={() => viewData(post)}
                            >
                              View
                            </div>
                            <div
                              className="all-btn edit-btn"
                              onClick={() => onEditData(post)}
                            >
                              Edit
                            </div>
                            <div
                              className="all-btn"
                              onClick={() => deletePost(post)}
                            >
                              Delete
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default App;
