import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost } from "./postsSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";  // Assuming you still want to use some custom styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .required("Title is required"),
  body: Yup.string()
    .min(10, "Body must be at least 10 characters")
    .required("Body is required"),
});

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);

  // Fetch posts when component mounts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Formik hook for managing form state
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Dispatch action to add a post
      dispatch(addPost(values)).then(() => {
        toast.success("Post added successfully");
        resetForm();
      });
    },
  });
  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId))
      .then(() => {
        toast.success("Post deleted successfully");
      })
      .catch(() => {
        toast.error("Failed to delete the post");
      });
  };

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            

            {/* Posts List */}
            <div className="col-lg-8">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <div className="card mb-4" key={post.id}>
                    
                    <div className="card-body">
                      <h5>{post.id} - {post.title}</h5>
                      <p>{post.body} <br/> <Link to={`/post/${post.id}`}>
              View Details
            </Link></p>
                      
                      <div className="postControlButtons">
                        <button className="btn btn-primary mr-2">
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button className="btn btn-danger"  onClick={() => handleDeletePost(post.id)}>
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts available</p>
              )}
            </div>

              {/* Add Post Form */}
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className={`form-control ${
                          formik.touched.title && formik.errors.title ? "is-invalid" : ""
                        }`}
                        {...formik.getFieldProps("title")}
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <div className="invalid-feedback">{formik.errors.title}</div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label htmlFor="body">Body</label>
                      <textarea
                        id="body"
                        name="body"
                        className={`form-control ${
                          formik.touched.body && formik.errors.body ? "is-invalid" : ""
                        }`}
                        {...formik.getFieldProps("body")}
                      />
                      {formik.touched.body && formik.errors.body ? (
                        <div className="invalid-feedback">{formik.errors.body}</div>
                      ) : null}
                    </div>

                    <button type="submit" className="btn btn-success w-100 mt-2">
                      <FontAwesomeIcon icon={faPlus} /> Add Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick />
    </>
  );
};

export default PostsList;
