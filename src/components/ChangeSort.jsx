import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
function ChangeSort({ queries, setQueries }) {
  const sortArray = ["Date", "Comment count", "Votes"];
  const [searchParams, setSearchParams] = useSearchParams();
  const orderArray = ["Descending", "Ascending"];
  const [textButton, setTextButton] = useState({
    sort_by: "Sort by",
    order: "Order",
  });
  //объединить все кнопки в одну хуйню

  // useEffect(() => {
  //   setQueries({ ...queries, order: textButton });
  // }, [textButton]);

  useEffect(() => {
    setSearchParams(queries);
  }, [queries]);
  return (
    <div className="sortButtonsInLine">
      <div className="dropdown">
        <button
          className="dropbtn"
          onClick={() => {
            setTextButton({ ...textButton, sort_by: "Sort by" });
            setSearchParams();
          }}
        >
          {textButton.sort_by}
        </button>
        <div className="dropdown-content">
          {sortArray.map((sorting) => {
            return (
              <button
                key={sorting}
                onClick={() => {
                  setQueries({ ...queries, sort_by: sorting });
                  setTextButton({ ...textButton, sort_by: sorting });
                }}
              >
                {sorting}
              </button>
            );
          })}
        </div>
      </div>
      <div className="dropdown">
        <button
          className="dropbtn"
          onClick={() => {
            setSearchParams();
            setTextButton({ ...textButton, order: "Order" });
          }}
        >
          {textButton.order}
        </button>
        <div className="dropdown-content">
          {orderArray.map((order) => {
            return (
              <button
                key={order}
                onClick={() => {
                  setQueries({ ...queries, order: order });
                  setTextButton({ ...textButton, order: order });
                }}
              >
                {order}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ChangeSort;
