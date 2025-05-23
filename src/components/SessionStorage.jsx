import React, { use, useEffect, useRef, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaStar, FaTrash } from "react-icons/fa";

const SessionStorage = () => {

  // ----------------- L O G I C - S T A R T ----------------------------

  // ------------ U S E - S T A T E -------------

  const [review, setReview] = useState({});
  const [reviewData, setReviewData] = useState([]);
  const [hover, setHover] = useState(0);
  const [star, setStar] = useState(0);
  const [editId, setEditId] = useState(null);
  const btnColor = useRef();
  const btnText = useRef();

  // ------------ U S E - E F F E C T -------------

  useEffect(() => {
    let newData = JSON.parse(sessionStorage.getItem("review")) || [];
    setReviewData(newData);
  }, []);

  // ------------ H A N D L E - H O V E R -------------

  const handleHover = (index) => {
    setHover(index);

    if (star != 0) {
      setStar(0);
    }
  };

  // ------------ H A N D L E - L E A V E -------------

  const handleLeave = (index) => {
    setHover(0);
    setStar(index);
  };

  // ------------ H A N D L E - D O W N -------------

  const handleDown = (index) => {
    setStar(index);
  };

  // ------------ H A N D L E - C H A N G E -------------

  const handleChange = (e) => {
    let { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  // ------------ H A N D L E -S U B M I T -------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId === null) {

      let newData = [...reviewData, { ...review, id: Date.now(), star: star }];
      setReviewData(newData);
      sessionStorage.setItem("review", JSON.stringify(newData));

    } else {

      let data = reviewData.map((val) => {

        if (val.id === editId) {
          val = { ...review, id: editId, star };

        }

        return val;
      });

      sessionStorage.setItem("review", JSON.stringify(data));
      setReviewData(data);
      setEditId(null);

      btnColor.current.classList.add("btn-danger");
      btnColor.current.classList.remove("btn-success");
      btnText.current.innerText = "Submit";
    }

    setReview({});
    setStar(0);
  };

  // ------------ H A N D L E - D E L E T E -------------

  const handleDelete = (id) => {

    let removeData = reviewData.filter((value) => value.id !== id);
    sessionStorage.setItem("review", JSON.stringify(removeData));
    setReviewData(removeData);

  };

  // ------------ H A N D L E - E D I T -------------

  const handleEdit = (id) => {

    let editData = reviewData.filter((value) => value.id === id)[0];
    setReview(editData);
    setEditId(id);

    btnColor.current.classList.remove("btn-danger");
    btnColor.current.classList.add("btn-success");
    btnText.current.innerText = "Update";

  };

  // ----------------- L O G I C - E N D ----------------------------

  return (
    <>
      <section className="form-section my-5">

        {/* ------------ F O R M - S E C T I O N ------------- */}
        <form
          method="post"
          className="shadow w-75 mx-auto p-5 rounded-3"
          onSubmit={handleSubmit}
        >
          <div className="title">
            <h2 className="text-danger fw-bold fs-4">Session Storage</h2>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6">

          {/* ------------ F O R M - L E F T - S E C T I O N ------------- */}

              <div className="form-left-item px-3">
                <div className="content">
                  <h2 className="display-5 fw-bold mb-4">
                    We'd love to hear{" "}
                    <span className="text-danger">your thoughts</span>
                  </h2>
                  <p>
                    Tell us about your vision which challanges are you facing?
                    We'd love to stay in touch with you, so we are always ready
                    to answer any question that interests you.
                  </p>
                </div>

                <div className="star-ratings">
                  <h5 className="text-danger fw-bold">Ratings</h5>
                  {[
                    ...Array(5)
                      .keys()
                      .map((_, index) => (
                        <FaStar
                          size={20}
                          key={index}
                          color={
                            hover > index || star > index ? "#dc3545" : "gray"
                          }
                          onMouseOver={() => handleHover(index + 1)}
                          onMouseLeave={() => handleLeave(index + 1)}
                          onMouseDown={() => handleDown(index + 1)}
                        />
                      )),
                  ]}
                </div>
              </div>
            </div>

            <div className="col-lg-6">

              {/* ------------ F O R M - R I G H T - S E C T I O N ------------- */}

              <div className="form-right-item">

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    What's your name?
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    value={review.username || ""}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    What's your email?
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={review.email || ""}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="reviews" className="form-label">
                    Share your thoughts
                  </label>
                  <textarea
                    name="reviews"
                    className="form-control"
                    id="reviews"
                    onChange={handleChange}
                    value={review.reviews || ""}
                  ></textarea>
                </div>

                <button
                  className="btn btn-danger icon-link icon-link-hover "
                  ref={btnColor}
                >
                  <span ref={btnText}>Submit</span>
                  <i className="bi bi-arrow-right mb-2"></i>
                </button>

              </div>
            </div>
          </div>
        </form>
      </section>

      {/* ------------ D A T A - S E C T I O N ------------- */}

      <section className="data-section py-5">
        <div className="container">
          <div className="title mb-5">
            <h2 className="fs-1 fw-bold">Reviews <span className="text-danger">Data</span></h2>
          </div>
          <div className="row g-3">
            {reviewData.map((val, index) => {
              const { username, email, reviews, id, star } = val;

              return (
                <div className="col-lg-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h5 className="card-title">{username}</h5>
                      <p className="card-text">
                        {" "}
                        <small>{email}</small>
                      </p>
                      <h6 className="card-subtitle mb-2 text-body-secondary mt-2">
                        {[
                          ...Array(5)
                            .keys()
                            .map((_, index) => (
                              <FaStar
                                key={index}
                                color={star > index ? "#dc3545" : "grey"}
                                size={20}
                              />
                            )),
                        ]}
                      </h6>

                      <h5>{reviews}</h5>
                      <div className="d-flex gap-2">
                        <p>Did you find it helpful?</p>
                        <a
                          href="#"
                          className="card-link text-decoration-none ms-1"
                        >
                          Yes
                        </a>
                        <a href="#" className="card-link text-decoration-none">
                          No
                        </a>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(id)}
                        >
                          <FaTrash key={index} size={15} />
                        </button>

                        <button
                          className="btn btn-outline-warning"
                          onClick={() => handleEdit(id)}
                        >
                          <BsPencilSquare size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SessionStorage;
