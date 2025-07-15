import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <h1>Welcome to Banklet</h1>
      <Link to="/login">
        <button>Sign Up / Log In</button>
      </Link>
    </div>
  );
}

export default Landing;
