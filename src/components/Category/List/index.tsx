import { useContext } from "react";
import { Form } from "formsy-semantic-ui-react";
import { Button, Label, Modal, Segment } from "semantic-ui-react";
import Card from "../../UI/Card";

import styles from "./category-list.module.css";
import AddItem from "./Item";
import AuthContext from "../../../store/auth-context";

const CategoriesList = (props) => {
  const {
    categories,
    onDeleteCategory,
    onEditCategory,
    onAddCategoryItem,
    onDeleteCategoryItem,
    setItemName,
    setItemPrice,
    setItemDescription,
    isOpenEditCategoryModal,
    onCloseEditCategoryModal,
    onUpdateCategory,
    selectedCategory,
    setUpdateCatName,
    setUpdateCatDescription,
    isLoading,
  } = props;

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const errorLabel = <Label color="red" pointing />;

  return (
    <section className={styles["cat-list-section"]}>
      <h1 className={styles["cat-list-title"]}>Menu Data</h1>

      {/* List of Categories */}

      {categories.length > 0 ? (
        categories.map((cat) => {
          return (
            <Segment loading={isLoading}>
              <Card
                key={cat.id}
                className={styles["list-cats"]}
                title={cat.name}
              >
                <>
                  {isLoggedIn && (
                    <Button.Group
                      className={styles["group-btns"]}
                      floated="right"
                    >
                      <Button
                        icon="pencil"
                        onClick={() => {
                          onEditCategory({ ...cat });
                        }}
                      ></Button>
                      <Button.Or />
                      <Button
                        positive
                        icon="trash alternate outline"
                        onClick={() => onDeleteCategory(cat)}
                      ></Button>
                    </Button.Group>
                  )}

                  <Segment className={styles["cat-description"]}>
                    <article>
                      <h5>Description</h5>
                      {cat.description ? (
                        <p>{cat.description}</p>
                      ) : (
                        <h5>No data available !</h5>
                      )}
                    </article>
                  </Segment>
                  {/* Add Item */}
                  {isLoggedIn && (
                    <AddItem
                      cat={cat}
                      onAddCategoryItem={onAddCategoryItem}
                      setItemName={setItemName}
                      setItemPrice={setItemPrice}
                      setItemDescription={setItemDescription}
                    />
                  )}
                  {/* List of Items */}
                  {cat.items.length > 0 ? (
                    cat.items.map((item: any) => (
                      <Segment>
                        <Card
                          key={item.id}
                          className={styles["cat-item"]}
                          title={item.name}
                        >
                          {isLoggedIn && (
                            <Button.Group
                              className={styles["group-btns"]}
                              floated="right"
                            >
                              <Button icon="pencil"></Button>
                              <Button.Or />
                              <Button
                                positive
                                icon="trash alternate outline"
                                onClick={() => onDeleteCategoryItem(cat, item)}
                              ></Button>
                            </Button.Group>
                          )}
                          <Segment className={styles["cat-item-description"]}>
                            <article>
                              <h5>Description</h5>
                              <p>{item.description}</p>
                            </article>
                          </Segment>
                          <Label
                            color="orange"
                            className={styles["cat-item-price"]}
                          >
                            {item.price} EGP
                          </Label>
                        </Card>
                      </Segment>
                    ))
                  ) : (
                    <h2 className={styles["no-categories"]}>No Found Items!</h2>
                  )}
                </>
              </Card>
            </Segment>
          );
        })
      ) : (
        <h2 className={styles["no-categories"]}>No Found Categories!</h2>
      )}

      {/* Edit Category Modal */}

      <Modal
        size="tiny"
        open={isOpenEditCategoryModal}
        closeIcon
        onClose={() => {
          onCloseEditCategoryModal();
        }}
      >
        <Modal.Header className="modal-header">
          <h3> Update Category</h3>
        </Modal.Header>
        <Modal.Content>
          <Form onValidSubmit={onUpdateCategory}>
            <Form.Field>
              <Form.Input
                name="name"
                type="text"
                label="Name"
                onChange={(e) => {
                  setUpdateCatName(e.target.value);
                }}
                required
                value={selectedCategory && selectedCategory.name}
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
                onChange={(e) => setUpdateCatDescription(e.target.value)}
                required
                value={selectedCategory && selectedCategory.description}
                validationErrors={{
                  isDefaultRequiredValue: "category description is required",
                }}
                errorLabel={errorLabel}
              />
            </Form.Field>
            <Button type="submit" positive floated="right">
              Update
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </section>
  );
};

export default CategoriesList;
