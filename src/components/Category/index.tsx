import { useEffect, useState } from "react";

import "semantic-ui-css/semantic.min.css";

import swal from "sweetalert";
import { v4 as uuidv4 } from "uuid";

import "./category.css";
import AddCategory from "./Form";
import CategoriesList from "./List";
import { Button, Icon, Menu } from "semantic-ui-react";
import logo from "../../assets/logo.jpeg";


const Category = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [catName, setCatName] = useState("");
  const [catDescription, setCatDescription] = useState("");

  const [updateCatName, setUpdateCatName] = useState("");
  const [updateCatDescription, setUpdateCatDescription] = useState("");

  const [isOpenEditCategoryModal, setIsOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>();

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const [userIsLoggedIn, setUserIsLoggedin] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const catItems: [] = [];

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
     setIsLoading(true);
    fetch("http://localhost:4000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
      setIsLoading(false)
  };

  const addCategoryHandler = () => {
    setIsLoading(true)
    fetch("http://localhost:4000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: catName,
        description: catDescription,
        items: catItems,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories({ ...data });
        setCatName("");
        setCatDescription("");
        getAllCategories();
      });

      setIsLoading(false)
  };

  const updateCategoryHandler = () => {
    const updatedCategory = { ...selectedCategory };
    const categoryId = updatedCategory.id;

    fetch(`http://localhost:4000/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updateCatName,
        description: updateCatDescription,
        items: updatedCategory.items,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setIsOpenEditCategoryModal(false);
        getAllCategories();
      });
  };

  const deleteCategoryHandler = (category: any) => {
    swal({
      title: `Are you sure you want to delete ${category.name} category?`,
      closeOnClickOutside: false,
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: [true, true],
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:4000/categories/${category.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then(() => {
            swal("Category deleted successfully!", {
              icon: "success",
            });
            getAllCategories();
          });
      }
    });
  };

  const deleteCategoryItemHandler = (category: any, item: any) => {
    swal({
      title: `Are you sure you want to delete ${item.name} item?`,
      closeOnClickOutside: false,
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: [true, true],
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:4000/categories/${category.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: category.name,
            description: category.description,
            items: category.items.filter((i) => i.id !== item.id),
          }),
        })
          .then((response) => response.json())
          .then(() => {
            swal("Category deleted successfully!", {
              icon: "success",
            });
            getAllCategories();
          });
      }
    });
  };

  const addItemHandler = (category) => {
    const catId = category.id;
    console.log(catId);

    fetch(`http://localhost:4000/categories/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: category.name,
        description: category.description,
        items: [
          ...category.items,
          {
            id: uuidv4(),
            name: itemName,
            price: itemPrice,
            description: itemDescription,
          },
        ],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        getAllCategories();
      });
  };

  const handleUserLogin = () => {
    setUserIsLoggedin((prevState) => !prevState);
    console.log(userIsLoggedIn);
  };

  return (
    <div className="container">

      <header>
        <div className="logo">
          <img src={logo} alt="there isn't logo" />
        </div>
        <div className="account">
          <Button type="submit" onClick={handleUserLogin}>Admin</Button>
          {userIsLoggedIn && <Menu compact color="grey">
            <Menu.Item as="a">
              <Icon name="user outline" /> Welcome Admin
            </Menu.Item>
          </Menu>}
        </div>
      </header>

      <section className="menu-cat-section">
        <AddCategory
          onSubmit={addCategoryHandler}
          setCatName={setCatName}
          catName={catName}
          setCatDescription={setCatDescription}
          catDescription={catDescription}
          userLoggedIn={userIsLoggedIn}
          isLoading={isLoading}
        />

        <CategoriesList
          categories={categories}
          onDeleteCategory={deleteCategoryHandler}
          onEditCategory={(cat) => {
            setIsOpenEditCategoryModal(true);
            setSelectedCategory({ ...cat });
          }}
          onAddCategoryItem={addItemHandler}
          onDeleteCategoryItem={deleteCategoryItemHandler}
          setItemName={setItemName}
          setItemPrice={setItemPrice}
          setItemDescription={setItemDescription}
          isOpenEditCategoryModal={isOpenEditCategoryModal}
          onCloseEditCategoryModal={() => {
            setIsOpenEditCategoryModal(false);
            setSelectedCategory(null);
          }}
          onUpdateCategory={updateCategoryHandler}
          selectedCategory={selectedCategory}
          setUpdateCatName={setUpdateCatName}
          setUpdateCatDescription={setUpdateCatDescription}
          userLoggedIn={userIsLoggedIn}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
};

export default Category;
