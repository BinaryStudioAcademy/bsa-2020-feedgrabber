import React, {FC} from 'react';
import Typography from '../Typography';
import Input from '../Input';
import Button from '../Button';
import {Formik} from "formik";
import * as yup from "yup";
import {IRegisterData} from "../../../models/IRegisterData";
import {registerRoutine} from "../../../containers/SignInBox/routines";
import {connect} from "react-redux";

interface IRegisterProps {
    signUp: (data: IRegisterData) => void;
    isLoading: boolean;
    className: string;
}

const schema = yup.object().shape({
    // companyName: yup
    //     .string()
    //     .required("Required")
    //     .min(6, "Too Short!")
    //     .max(20, "Too Long!"),
    // email: yup
    //     .string()
    //     .email()
    //     .required(),
    // password: yup
    //     .string()
    //     .required("Required")
    //     .min(6, "Too Short!")
    //     .max(30, "Too Long!"),
    // username: yup
    //     .string()
    //     .required("Required")
    //     .min(5, "Too Short!")
    //     .max(15, "Too Long!")
});

const SignUpForm: FC<IRegisterProps> = props => {
    const {signUp: register, className} = props;

    return (
        <Formik
            initialValues={{email: '', password: '', companyName: '', username: ''}}
            validationSchema={schema}
            onSubmit={values => {
                console.log(values);
                register({
                    email: values.email,
                    password: values.password,
                    companyName: values.companyName,
                    username: values.username
                });
            }
            }
        >
            {({
                  errors,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  touched
              }) => (
                <form className={className} onSubmit={handleSubmit}>
                    <Typography fontWeight="bold" variant="h4">Create Account</Typography>
                    <Typography variant="body2">or use your email for registration</Typography>
                    <Input name="username" placeholder="Username" value={values.username}
                           error={touched.username && (errors.username ?? null)}
                           onChange={handleChange}
                           onBlur={handleBlur}
                    />
                    <Input name="email" type="email" placeholder="Email" value={values.email}
                           error={touched.email && (errors.email ?? null)}
                           onChange={handleChange} onBlur={handleBlur}
                    />
                    <Input name="companyName" placeholder="Company" value={values.companyName}
                           error={touched.companyName && (errors.companyName ?? null)}
                           onChange={handleChange} onBlur={handleBlur}
                    />
                    <Input name="password" type="password" placeholder="Password" value={values.password}
                           error={touched.password && (errors.password ?? null)}
                           onChange={handleChange} onBlur={handleBlur}
                    />
                    <Button variant="secondary" type="submit" marginTop="1.17rem">
                        Sign Up
                    </Button>
                </form>)}
        </Formik>
    );
};

const mapStateToProps = rootState => ({
    isLoading: rootState.profile.isLoading
});

const mapDispatchToProps = {
    signUp: registerRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
