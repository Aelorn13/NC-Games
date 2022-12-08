import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h2>Oops! You seem to be lost.</h2>
      <p>Here are some helpful links:</p>
      <Link to="/">Home</Link>
    </div>
  );
}
