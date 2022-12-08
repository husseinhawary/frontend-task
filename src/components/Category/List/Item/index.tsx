import { Form } from "formsy-semantic-ui-react";
import { Button, Label, Segment } from "semantic-ui-react";

import styles from "./add-item.module.css";

const AddItem = (props) => {
  const {
    cat,
    onAddCategoryItem,
    setItemName,
    setItemPrice,
    setItemDescription,
    userLoggedIn
  } = props;

  const errorLabel = <Label color="red" pointing />;

  return (
    <>
      <h4>Add Category Item</h4>
      <Segment>
        <Form onValidSubmit={() => onAddCategoryItem(cat)}>
          <Form.Group>
            <Form.Field className={styles["item-name"]}>
              <Form.Input
                type="text"
                name="name"
                label="Name"
                required
                onChange={(e) => setItemName(e.target.value)}
                validationErrors={{
                  isDefaultRequiredValue: "item name is required",
                }}
                errorLabel={errorLabel}
              />
            </Form.Field>
            <Form.Field className={styles["item-price"]}>
              <Form.Input
                type="number"
                name="price"
                label="Price"
                required
                onChange={(e) => setItemPrice(e.target.value)}
                validationErrors={{
                  isDefaultRequiredValue: "item price is required",
                }}
                errorLabel={errorLabel}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <Form.TextArea
              type="text"
              name="description"
              label="Description"
              required
              onChange={(e) => setItemDescription(e.target.value)}
              validationErrors={{
                isDefaultRequiredValue: "item description is required",
              }}
              errorLabel={errorLabel}
            />
          </Form.Field>
          {userLoggedIn && <Button type="submit">Save</Button>}
        </Form>
      </Segment>
    </>
  );
};

export default AddItem;
