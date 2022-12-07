import { useState, useEffect } from "react";
import { getCategories } from "../utils/api";
import { Link } from "react-router-dom";

function ChangeCategory() {
  const [arrayCateg, setArrayCateg] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      const newList = categories.map((category) => {
        return category.slug;
      });
      setArrayCateg(newList);
    });
  }, []);
  return (
    <div>
      <div className="dropdown">
        <Link to="/">
          <button className="dropbtn">Choose category</button>
        </Link>
        <div className="dropdown-content">
          {arrayCateg.map((category) => {
            return (
              <Link key={category} to={`/category/${category}`}>
                <a href={category}>{category}</a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChangeCategory;
