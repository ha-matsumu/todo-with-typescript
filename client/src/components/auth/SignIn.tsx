import React, { Fragment, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

import { UserContext } from '../../store/contexts/userContext';

export interface Props {
  authHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const SignIn: React.FC = () => {
  const { authUser } = useContext(UserContext);
  const [email, setEmail] = useState<null | string>('');
  const [password, setPassword] = useState<null | string>('');

  const authHandler = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      await authUser(user);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Fragment>
      <div className="text-center mt-4">
        <p className="lead">Sign in to your account to continue</p>
      </div>

      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <Label>Email</Label>
              <Input
                bsSize="lg"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={e => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                bsSize="lg"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={e => setPassword(e.target.value)}
                required
              />
              {/* <small>
              <Link to="/auth/reset-password">Forgot password?</Link>
            </small> */}
            </FormGroup>
            {/* <div>
              <CustomInput type="checkbox" id="rememberMe" label="Remember me next time" defaultChecked />
            </div> */}
            <div className="text-center mt-3">
              {/* <Link to="/dashboard/default"> */}
              <Button color="primary" size="lg" onClick={authHandler}>
                Sign in
              </Button>
              {/* </Link> */}
            </div>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default SignIn;
