/* eslint-disable */

import React from 'react';
import Typography from '../Typography';
import Input from '../Input';
import Button from '../Button';

function SignInForm({className}) {
  return (
    <form className={className} action="#">
			<Typography  fontWeight="bold" variant="h4">Sign in</Typography>
			<Typography variant="body2">or use your account</Typography>

			<Input id="email" name="email" type="email" placeholder="Email" />
			<Input id="password" name="password" type="password" placeholder="Password" />

			<Button variant="secondary" type="submit" marginTop="1.17rem">Sign In</Button>
		</form>
  );
}

export default SignInForm;