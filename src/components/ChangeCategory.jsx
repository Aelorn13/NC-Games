import { useState, useEffect } from "react";
import { getCategories } from "../utils/api";
import { Link } from "react-router-dom";

function ChangeCategory() {
  const [arrayCateg, setArrayCateg] = useState([]);
  const [buttonName, setButtonName] = useState("Category");

  useEffect(() => {
    getCategories().then((categories) => {
      const newList = categories.map((category) => {
        return category.slug;
      });
      setArrayCateg(newList);
    });
  }, []);
  const formatCategory = (category) => {
    return (
      category.charAt(0).toUpperCase() + category.slice(1).replaceAll("-", " ")
    );
  };
  return (
    <div>
      <div className="dropdown">
        <Link to="/">
          <button onClick={() => setButtonName("Category")} className="dropbtn">
            {buttonName}
          </button>
        </Link>
        <div className="dropdown-content">
          {arrayCateg.map((category) => {
            return (
              <Link
                onClick={() => {
                  setButtonName(formatCategory(category));
                }}
                key={category}
                to={`/category/${category}`}
              >
                {formatCategory(category)}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChangeCategory;
