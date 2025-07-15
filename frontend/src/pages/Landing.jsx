import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <h1>Welcome to Budgeteer</h1>
      <Link to="/login">
        <button>Sign Up / Log In</button>
      </Link>
    </div>
  );
}

export default Landing;
