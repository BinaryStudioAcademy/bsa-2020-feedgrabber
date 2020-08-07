/* eslint-disable */

import React from 'react';
import Typography from '../Typography';
import Input from '../Input';
import Button from '../Button';

function SignUpForm({className}) {
  return (
    <form className={className} action="#">
			<Typography  fontWeight="bold" variant="h4">Create Account</Typography>
			<Typography variant="body2">
				or use your email for registration
			</Typography>

			<Input id="name" name="name" type="text" placeholder="Name" />
			<Input id="email" name="email" type="email" placeholder="Email" />
			<Input id="password" name="password" type="password" placeholder="Password" />

			<Button variant="secondary" type="submit" marginTop="1.17rem">Sign Up</Button>
		</form>
  );
}

export default SignUpForm;