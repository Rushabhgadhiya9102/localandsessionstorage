import React, {useState, useEffect, useRef} from 'react'

const SessionStorage = () => {

 // ------------ U S E - S T A T E -------------

  const [employee, setEmployee] = useState({});
  const [empData, setEmpData] = useState([]);
  const [role, setRole] = useState([]);
  const [editId, setEditId] = useState(null);

  const btnSubmit = useRef();
  const username = useRef();

  // ----------- U S E - E F F E C T ------------

  useEffect(() => {
    let oldList = JSON.parse(sessionStorage.getItem("empData")) || [];
    console.log("getitem :", oldList);
    setEmpData(oldList);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("empData", JSON.stringify(empData));
    console.log("setitem :", empData);
  }, [empData]);

  // ---------- H A N D L E - C H A N G E -------------

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if(name === "role"){

      let newRole = [...role];

      if(checked){
        newRole.push(value)
      }else {
        newRole = newRole.filter((val) => val != value);
      }

      setRole(newRole);
      setEmployee((prev) => ({ ...prev, role: newRole }));
      return;
    }

    let newObj = { ...employee, [name]: value };
    setEmployee(newObj);
  };

  // ---------- H A N D L E - S U B M I T -----------

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editId === null) {
      let newArr = [...empData, { ...employee, id: Date.now() }];
      setEmpData(newArr);
    } else {
      let data = empData.map((val) => {
        if (val.id === editId) {
          val = employee;
        }
        return val;
      });

      setEmpData(data);
      setEditId(null);
      btnSubmit.current.classList.remove("btn-success");
      btnSubmit.current.innerText = "Submit";
      btnSubmit.current.classList.add("btn-primary");
    }

    setEmployee({});
    setRole([])
    username.current.focus();
  };

  // ---------- H A N D L E - D E L E T E --------------

  const handleDelete = (id) => {
    let removeData = empData.filter((val) => val.id !== id);
    setEmpData(removeData);
  };

  // --------- H A N D L E - E D I T ----------------

  const handleEdit = (id) => {
    let editData = empData.filter((val) => val.id === id)[0];
    setEmployee(editData);
    setEditId(id);
    btnSubmit.current.classList.add("btn-success");
    btnSubmit.current.innerText = "Update";
    btnSubmit.current.classList.remove("btn-primary");
    username.current.focus();
  };

  return (
    <>
     <section className="sessionStorage mt-5 ">
        <div className="container">
          <h2 className="fs-1 text-center fw-semibold text-primary my-5">Session Storage </h2>
          <form
            method="post"
            className="p-4 rounded-4 border w-50 mx-auto"
            onSubmit={handleSubmit}
          >
            {/* email */}

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Employee Name
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={employee.username || ""}
                onChange={handleChange}
                ref={username}
              />
            </div>

            {/* email */}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={employee.email || ""}
                onChange={handleChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            {/* department */}

            <div className="my-3">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="Hr"
                  value="Hr"
                  name="role"
                  checked={role.includes("Hr") ? true : false}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="Hr">
                  Hr
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="Development"
                  value="Development"
                  name="role"
                  checked={role.includes("Development") ? true : false}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="Development">
                  Development
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="Tester"
                  value="Tester"
                  name="role"
                  checked={role.includes("Tester") ? true : false}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="Tester">
                  Tester
                </label>
              </div>
            </div>

            {/* submit button */}

            <button type="submit" className="btn btn-primary" ref={btnSubmit}>
              Submit
            </button>
          </form>
        </div>
      </section>

      <section className="list my-5">
        <div className="container">
          <h1 className="my-5">Employee Data </h1>
          <div className="row g-3">
            {empData.map((val, index) => (
              <div className="col-lg-3" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title text-body-secondary">Id No: {index + 1}</h6>
                    <h5 className="card-subtitle mb-2">
                     Name: {val.username}
                    </h5>
                    <p className="card-text">Email: {val.email}</p>
                    <p className="card-text">Role: {val.role ? val.role.toString() : []}</p>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(val.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(val.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default SessionStorage
