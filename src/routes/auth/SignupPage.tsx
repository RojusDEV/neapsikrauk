import Header from "@/components/Header/Header";
import { useForm } from "react-hook-form";
import { Link, redirect } from "react-router-dom";
import { signupUser } from "@/api/auth/authentication";

type GenderEnum = "female" | "male";

type inputs = {
  full_name: string;
  email: string;
  password: string;
  gender: GenderEnum;
};

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputs>();

  const handleSignup = async (data: inputs) => {
    const { error } = await signupUser(data);
    if (!error) {
      redirect("/dashboard");
    }
  };

  return (
    <div className="signup-page">
      <Header />
      <main className="signup-page-wrapper">
        <div className="signup-page-wrapper-top">
          <h1 className="signup-page-heading">Sign Up</h1>
          <hr className="side-line" />
          <div className="signup-page-form-wrapper">
            <p className="signup-page-paragraph">
              Secure solution for your digital money
            </p>
            <form
              className="signup-page-form"
              onSubmit={handleSubmit((data) => handleSignup(data))}
            >
              <input
                type="text"
                id="name-field"
                {...register("full_name")}
                placeholder="Full Name"
              />
              {errors.full_name && <span>{errors.full_name?.message}</span>}
              <input
                type="text"
                id="email-field"
                {...register("email")}
                placeholder="email"
              />
              {errors.email && <span>{errors.email?.message}</span>}
              <input
                type="password"
                className="passwordInput"
                {...register("password")}
                placeholder="Choose A Password"
                id="password-field"
              />
              {errors.password && <span>{errors.password?.message}</span>}
              <button type="submit" className="createAccountBtn">
                CREATE ACCOUNT
              </button>
            </form>
          </div>
          <span className="forgot-password-link">
            <Link to="/auth/signup">Forgot password</Link>
          </span>
        </div>
        {/* <div className="testimonial">
          <h2 className="testimonial-primary">5K+ WALLETS</h2>
          <span className="testimonial-secondary">300K+ TRANSACTIONS</span>
        </div> */}
      </main>
    </div>
  );
};

export default SignupPage;
