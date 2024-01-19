import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from "formik";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  useGetQuesDataQuery,
  usePostAnsDataMutation,
  useGetLeaderDataQuery,
} from "../Services/quesApi";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Quize = () => {
  const [score, setScore] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: QuesData } = useGetQuesDataQuery(currentPage);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [message, setMessage] = useState("Login Successfully");
  const [snakcolor, setSnackColor] = useState("success");
  const { vertical, horizontal, open } = state;

  //------------------RTK Query Fetching-------------------
  const [ansData] = usePostAnsDataMutation();
  const { refetch: refetchData } = useGetLeaderDataQuery();
  const name = localStorage.getItem("name");

  const submitHandler = async (values, formikBag) => {
    if (name === null || name === undefined) {
      setState({ vertical: "top", horizontal: "center", open: true });
      setSnackColor("error");
      setMessage("Please Login First");
    } else {
      try {
        const valuesArray = Object.values(values);
        const param = {
          ans: valuesArray,
          marks: QuesData?.data[0]?.marks,
          part: QuesData?.data[0]?.part,
          name: name,
        };
        const response = await ansData(param);
        refetchData();
        setScore(response?.data?.ans);
      } catch (error) {
        console.log("Fail", error);
      }
      formikBag.resetForm(); // Reset the form values
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    setScore(-1);
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: submitHandler,
  });
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div className="container">
        {QuesData?.data?.length===0 ? <center>No Data Available</center>:(
      <Card className="quiz-card">
        <Form onSubmit={formik.handleSubmit}>
          {QuesData?.data?.map((row, index) => (
            <div key={row?._id}>
              <Form.Label>
                Q{index + 1} {row.questions}
              </Form.Label>
              {row?.options?.map((type, index) => (
                <div key={index} className="mb-3 options">
                  <Form.Check
                    required
                    type="radio"
                    id={`${index}`}
                    label={`${type}`}
                    name={row?._id}
                    value={`${type}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values[row?._id] === `${type}`}
                  />
                </div>
              ))}
            </div>
          ))}
          <br />
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
        {score !== -1 ? <div className="score">Your Score is {score}</div> : ""}
        <br />
        {score !== -1 && (
          <Button variant="dark" onClick={handleNext}>
            Try More!
          </Button>
        )}
      </Card>
      )}
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

export default Quize;
