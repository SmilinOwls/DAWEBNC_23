import React, { useState, useEffect } from 'react';
import "./styles.css";
import { useHistory, Link } from 'react-router-dom'
import bgSignin from '../../Assets/images/bgsignin.jpg';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import zxcvbn from 'zxcvbn';
import { PasswordStr } from '../Signup';
import { resetPassword, verifyResetToken } from '../../Actions/AuthAction';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function ResetPassword(props) {
  let [initialValues, setInitialValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [score, setScore] = useState(props.score || 0);
  const [pwBtn, setPwBtn] = useState(props.pwBtn || 'show');
  const [type, setType] = useState(props.type || 'password');
  const history = useHistory();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const resetToken = new URLSearchParams(search).get('resetToken');

  const userInfo = JSON.parse(localStorage.getItem("user"));
  if (userInfo) {
    history.push("/");
  };

  useEffect(() => {
    if (!resetToken) return () => { };
    async function verify() {
      const data = await verifyResetToken({ resetToken: resetToken });
      console.log(data);
      if (data) {
        setToken(data.token)
        setEmail(data.email);
      }
    };
    verify();
  }, []);


  const validationSchema = () => {
    return Yup.object().shape({
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    });
  };


  const pwHandleChange = (event) => {

    if (event.target.value === "") {
      setScore(0);
    } else {
      var pw = zxcvbn(event.target.value);
      setScore(pw.score + 1);
    }
  }

  const pwMask = () => {
    setType(type === "password" ? "input" : "password");
    setPwBtn(pwBtn === "show" ? "hide" : "show");
  }


  const handleSubmit = (value) => {
    dispatch(resetPassword({...value, email: email, token: token}));
  };

  return (
    <div className="ResetPass my-5 py-3">

      <div className="position-relative">
        <div style={{
          width: '400px',
        }} className="flex justify-center">
          <img style={{
            width: "300px",
            height: "280px"
          }} src={bgSignin} alt="Booking4T" />
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (

          <Form>
            <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Reset Password</h3>
            <div className="form-holder">
              <Field
                name="email"
                type="text"
                className={
                  'reset-form-control' +
                  (errors.email && touched.email ? ' is-invalid' : '')
                }
                placeholder="Input email"
                value={email}
                readOnly
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-holder">

              <Field
                name="password"
                type={type}
                className={
                  'reset-form-control' +
                  (errors.password && touched.password ? ' is-invalid' : '')
                }
                placeholder="Input password"
                onKeyUp={pwHandleChange}

              />

              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className='pwStrRow'>
              {score >= 1 && <div>
                <PasswordStr score={score} />
                <button
                  className="btn btn-success my-2 pwBtn"
                  onClick={pwMask}
                >{pwBtn}</button>
              </div>}
            </div>

            <div className="form-holder">

              <Field
                name="confirmPassword"
                type={type}
                className={
                  'reset-form-control' +
                  (errors.confirmPassword && touched.confirmPassword
                    ? ' is-invalid'
                    : '')
                }
                placeholder="Input re-password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-button">
              <button
                className='forgot-pass-btn'
                type="submit">
                Confirm
              </button>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  )
}

export default ResetPassword