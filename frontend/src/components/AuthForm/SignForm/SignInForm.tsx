
import React, { FC } from 'react';
import Typography from './Typography';
import Input from './Input';
import Button from './Button';
import * as yup from "yup";
import { Formik } from 'formik';
import { loginRoutine } from 'components/AuthForm/routines';
import { connect } from 'react-redux';
import {ILoginData} from "../../../models/auth/types";

interface ILoginProps {
	signIn: (data: ILoginData) => void;
	isLoading: boolean;
	className: string;
}

const schema = yup.object().shape({
	//
});

const SignInForm: FC<ILoginProps> = props => {
	const { signIn: login, className } = props;

	return (
		<Formik
			initialValues={{ password: '', username: '' }}
			validationSchema={schema}
			onSubmit={values => {
				console.log(values);
				login({
					password: values.password,
					username: values.username
				});
			}
			}
		>
			{({
                values,
				errors,
				handleChange,
				handleBlur,
				handleSubmit,
				touched
			}) => (
					<form className={className} onSubmit={handleSubmit}>
						<Typography fontWeight="bold" variant="h4">Sign In</Typography>
						<Typography variant="body2">or use your account</Typography>
						<Input name="username" placeholder="Username" value={values.username}
							error={touched.username && (errors.username ?? null)}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Input name="password" type="password" placeholder="Password" value={values.password}
							error={touched.password && (errors.password ?? null)}
							onChange={handleChange} onBlur={handleBlur}
						/>
						<Button variant="secondary" type="submit" marginTop="1.17rem">
							Sign In
				</Button>
					</form>)}
		</Formik>
	);
};

const mapStateToProps = rootState => ({
	isLoading: rootState.profile.isLoading
});

const mapDispatchToProps = {
	signIn: loginRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
