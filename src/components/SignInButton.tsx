'use client';
import React from 'react';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

type SignInButtonProps = {};

const SignInButton = (props: SignInButtonProps) => {
  return (
    <>
      <Button
        variant="ghost"
        onClick={() => {
          signIn('google');
        }}>
        Sign In
      </Button>
      {/* <Button
        variant="ghost"
        onClick={() => {
          // signIn();
          signIn('credentials');
        }}>
        Sign In Demo
      </Button> */}
    </>
  );
};

export default SignInButton;
