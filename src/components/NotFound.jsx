import { Link } from "react-router-dom";

//for some reason this link doesn't work from wrong category
export default function NotFound() {
  return (
    <div className="text-center">
      <h2 className="not-found-text">Please go back to the home page</h2>
      <Link className="link" to="/">
        Home
      </Link>
    </div>
  );
}
