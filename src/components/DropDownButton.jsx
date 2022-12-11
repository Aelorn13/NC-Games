import { useEffect, useState } from "react";
function DropDownButton({
  setSearchParams,
  queries,
  setQueries,
  array,
  propertyName,
}) {
  //example for import
  //     <DropDownButton
  //     setSearchParams={setSearchParams}
  //     queries={queries}
  //     setQueries={setQueries}
  //     array={sortArray}
  //     propertyName={"sort_by"}
  //   />

  const [textButton, setTextButton] = useState(propertyName);
  useEffect(() => {
    setSearchParams(queries);
  }, [queries]);
  return (
    <div className="dropdown">
      <button
        className="dropbtn"
        onClick={() => {
          setTextButton(propertyName);
          setSearchParams();
        }}
      >
        {textButton}
      </button>
      <div className="dropdown-content">
        {array.map((element) => {
          return (
            <button
              key={element}
              onClick={() => {
                setQueries({ ...queries, [propertyName]: element });
                setTextButton(element);
              }}
            >
              {element}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default DropDownButton;
