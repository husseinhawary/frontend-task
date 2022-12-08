import { Button, Label, Segment } from "semantic-ui-react";
import { Form } from "formsy-semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import styles from "./add-category.module.css"

const AddCategory = (props) => {
  const {
    onSubmit,
    setCatName,
    catName,
    setCatDescription,
    catDescription,
    userLoggedIn,
    isLoading
  } = props;


  const errorLabel = <Label color="red" pointing />;
  return (
    <aside className={styles["side"]}>
      <h1 className={styles["side-title"]}>Add Category</h1>
      <Segment loading={isLoading}>
        <Form onValidSubmit={onSubmit}>
          <Form.Field>
            <Form.Input
              name="name"
              type="text"
              label="Name"
              onChange={(e) => setCatName(e.target.value)}
              required
              value={catName}
              validationErrors={{
                isDefaultRequiredValue: "category name is required",
              }}
              errorLabel={errorLabel}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              name="description"
              type="TextArea"
              label="Description"
              onChange={(e) => setCatDescription(e.target.value)}
              required
              value={catDescription}
              validationErrors={{
                isDefaultRequiredValue: "category description is required",
              }}
              errorLabel={errorLabel}
            />
          </Form.Field>
          {userLoggedIn && <Button type="submit">Save</Button>}
        </Form>
      </Segment>
    </aside>
  );
};

export default AddCategory;
