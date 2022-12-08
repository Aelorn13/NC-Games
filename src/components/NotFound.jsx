import { Link } from "react-router-dom";

//for some reason this link doesn't work from wrong category
export default function NotFound() {
  return (
    <div>
      <h2>Oops! You seem to be lost.</h2>
      <p>Here are some helpful links:</p>
      <Link to="/">Home</Link>
    </div>
  );
}
