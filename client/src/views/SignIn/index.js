import "../../assets/css/SignUp.css";

function SignIn() {
  return (
    <div className="signin">
      <form className="signin-form">
        <input type="text" placeholder="Enter your username" />
        <br />
        <input type="password" placeholder="Enter your password" />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SignIn;
