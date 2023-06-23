import { FC, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './SignIn.css';
import { INPUT_CONTROL_TYPE, InputControl } from 'src/Shared';
import { signIn, useAppDispatch, useAppSelector } from 'src/Redux';

const SignIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const usersStore = useAppSelector((state) => state.users);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const enteredEmail = (event.currentTarget[0] as HTMLInputElement).value;
    const user = usersStore.users.find(
      (x) => x.email.toLocaleLowerCase() === enteredEmail.toLocaleLowerCase()
    );

    if (user) {
      dispatch(signIn(user));
      navigate('/');
    } else {
      alert('Account Not Found');
    }
  };

  return (
    <form onSubmit={onSubmit} className="sign-in-wrapper">
      <InputControl
        name="email"
        label="Email"
        required={true}
        type={INPUT_CONTROL_TYPE.EMAIL}
      />

      <Link to="/auth/sign-up">Create Account</Link>

      <button className="btn btn-success" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
