import { FC, FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

import './SignUp.css';
import { addUser, useAppDispatch, useAppSelector } from 'src/Redux';
import { INPUT_CONTROL_TYPE, InputControl, UserModel } from 'src/Shared';

const cities: string[] = ['Texas', 'Dallas'];

const SignUp: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStore = useAppSelector((state) => state.auth);
  const usersStore = useAppSelector((state) => state.users);

  const signUp = (user: UserModel): void => {
    dispatch(addUser(user));
    navigate('/auth/sign-in');
  };

  const getAge = useCallback((date: Date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const user = new UserModel({
      id: new Date().getTime(),
      name: (event.currentTarget[0] as HTMLInputElement).value,
      email: (event.currentTarget[1] as HTMLInputElement).value,
      dob: new Date((event.currentTarget[2] as HTMLInputElement).value),
      city: (event.currentTarget[3] as HTMLInputElement).value,
      pinCode: Number((event.currentTarget[4] as HTMLInputElement).value),
    });

    if (getAge(user.dob) < 18) {
      alert('User Age Must Be At Least 18');
      return;
    }

    if (
      usersStore.users.find(
        (x) => x.email.toLocaleLowerCase() === user.email.toLocaleLowerCase()
      )
    ) {
      alert('This Email Is Already Registered');
      return;
    }

    signUp(user);
  };

  console.log(authStore);

  return (
    <form onSubmit={onSubmit} className="sign-up-wrapper">
      <InputControl label="Name" name="name" required={true} />
      <InputControl
        name="email"
        label="Email"
        required={true}
        type={INPUT_CONTROL_TYPE.EMAIL}
      />
      <InputControl
        name="dob"
        label="DOB"
        required={true}
        type={INPUT_CONTROL_TYPE.DATE_PICKER}
      />
      <InputControl
        name="city"
        label="City"
        required={true}
        options={cities}
        type={INPUT_CONTROL_TYPE.DROPDOWN}
      />
      <InputControl
        name="pinCode"
        label="PIN"
        required={true}
        min={100000}
        max={999999}
        type={INPUT_CONTROL_TYPE.NUMBER}
      />

      <Link to="/auth/sign-in">Already Have An Account? Sign In</Link>

      <button className="btn btn-primary" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
