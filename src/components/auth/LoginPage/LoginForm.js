import FormField from "../../shared/FormField";

function LoginForm() {

  return (
    <div className="loginForm">
      <form className="loginForm">
        <FormField 
          label="email or username: "
        />
        <FormField
          label="password: "
        />
      </form>
    </div>
  )
}

export default LoginForm;