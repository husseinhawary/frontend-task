import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Button, Label } from "semantic-ui-react";
import { Form } from "formsy-semantic-ui-react";
import "semantic-ui-css/semantic.min.css";


import AuthContext from "../../store/auth-context";
import { userLoginService } from "./services";

import { en } from "./locale/en";

import "./login.scss";

const Login = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const userLogin = () => {
    userLoginService(formData).then((response) => {
      authCtx.login(response.data.accessToken);
      history.replace("/categories");
    }).catch(()=>alert(en.errors.loginErrorMessage));
  };

  const errorLabel = <Label color="red" pointing />;
  return (
    <section className="login-section">
      <h1 className="login-section__title">{en.title}</h1>
      <Form onValidSubmit={userLogin}>
        <Form.Field>
          <Form.Input
            name="email"
            type="text"
            label={en.inputs.userEmail}
            onChange={(e) => handleChange(e)}
            required
            validationErrors={{
              isDefaultRequiredValue: en.errors.emailRequired,
            }}
            errorLabel={errorLabel}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            name="password"
            type="password"
            label={en.inputs.userpassword}
            onChange={(e) => handleChange(e)}
            required
            validationErrors={{
              isDefaultRequiredValue: en.errors.passwordRequired,
            }}
            errorLabel={errorLabel}
          />
        </Form.Field>
        <Button type="submit" className="login-section__btn">
        {en.buttons.login}
        </Button>
      </Form>
    </section>
  );
};

export default Login;
