import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../Services/quesApi";
import style from "./loginSignUp.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DialogContent, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your name"),
  password: Yup.string().min(6).required("Please Enter min 6 digit password"),
  repassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = () => {
  //handlecStates
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [message, setMessage] = useState("Login Successfully");
  const [snakcolor, setSnackColor] = useState("success");
  const { vertical, horizontal, open } = state;

  // const loginStatus = useSelector((state) => state.containerr.logstatus);
  // console.log("loginStatus ", loginStatus);

  const navigate = useNavigate();
  const [createSignUp] = useSignupMutation();
  //   console.log("data", login);

  const submitHandler = async (values, action) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    try {
      const response = await createSignUp(data);
      if (response.error) {
        setState({ vertical: "top", horizontal: "center", open: true });
        setSnackColor("error");
        setMessage("Somthing Went Wrong");
      }
      if (response.data) {
        setState({ vertical: "top", horizontal: "center", open: true });
        setSnackColor("success");
        setMessage("Signup Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 500);
        // console.log(response);
      } else {
        setState({ vertical: "top", horizontal: "center", open: true });
        setSnackColor("error");
        setMessage("Email Already Exists");
      }
    } catch (error) {
      console.error("Error creating the user:", error);
    }
    action.resetForm();
  };

  const initialValues = {
    email: "",
    password: "",
    repassword: "",
    name: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: submitHandler,
      //  (values)=>{
      //     console.log("Values",values)
      // }
    });

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <div>
      <div className="body">
        <br />
        <br />
        <div class="login">
          {/* <div class="logimg">
            <img src={loginImage} alt="" />
          </div> */}
          <h3>
            <br />
            <p>Signup</p>
          </h3>
          {/* <br /> */}
          <DialogContent classes={{ root: "p-16 pb-0 sm:p-32 sm:pb-0" }}>
            <form action="" onSubmit={handleSubmit}>
              <TextField
                className="textfield"
                type="name"
                placeholder="Enter Your Name"
                required
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              {/* {errors.name && touched.name ? <p className="form-error">{errors.name}</p> : " "} */}
              <br />
              <TextField
                className="textfield"
                type="email"
                placeholder="Enter Your Email"
                required
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <br />
              <TextField
                className="textfield"
                type="password"
                placeholder="Password"
                required
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <br />
              <TextField
                className="textfield"
                type="password"
                placeholder="Confirm Password"
                required
                name="repassword"
                id="repassword"
                value={values.repassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.repassword && Boolean(errors.repassword)}
                helperText={touched.repassword && errors.repassword}
              />
              <br /> <br />
              <p>
                {" "}
                By continuing, I agree to the <cite>Terms of Use</cite> &{" "}
                <cite>Privacy Policy</cite>
              </p>{" "}
              <h4>
                {" "}
                <button
                  type="submit"
                  id="submit"
                  class="co"
                  className="loginButton"
                >
                  {/* <Link to="/login"> */}
                  REGISTRATION
                  {/* </Link> */}
                </button>
              </h4>
            </form>
          </DialogContent>

          <p>
            Already have account?{" "}
            <cite>
              <Link to="/login">Log In</Link>
            </cite>
          </p>
          <br />
        </div>
      </div>
      {/* alert snakbar start */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snakcolor}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {/* alert snakbar end */}
    </div>
  );
};

export default LoginPage;
