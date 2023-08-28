import "../../assets/css/SignUp.css";

function SignUp() {
  return (
    <div className="signup">
      <form className="signup-form">
        <input type="text" placeholder="Enter your email" />
        <br />
        <input type="text" placeholder="Enter your family name" />
        <input type="text" placeholder="Enter your first name" />
        <br />
        <input type="text" placeholder="Enter your username" />
        <input type="password" placeholder="Enter your password" />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SignUp;
