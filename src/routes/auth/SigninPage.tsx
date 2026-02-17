import { signinUser, signInWithGoogle } from "@/api/auth/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import "@/styles/pages/_SignInPage.scss";
import { useState } from "react";
import { AuthError } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/Header";
import { FcGoogle } from "react-icons/fc";

type SigninProps = {
  email: string;
  password: string;
};
const SigninPage = () => {
  const [SigninError, setSigninError] = useState<AuthError | null>(null);

  const SigninSchema = z.object({
    email: z.email(),
    password: z.string(),
  });

  const navigate = useNavigate();

  type SigninSchema = z.infer<typeof SigninSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchema>({
    resolver: zodResolver(SigninSchema),
  });

  const handleSignin = async (data: SigninProps) => {
    const { error } = await signinUser(data);
    if (!error) {
      navigate("/dashboard");
    }
    setSigninError(error);
  };
  
  return (
    <div className="Signin-page">
      <Header />
      <main className="Signin-page-wrapper">
        <div className="Signin-page-wrapper-top">
          <h1 className="Signin-page-heading">Sign In</h1>
          <hr className="side-line" />
          <div className="Signin-page-form-wrapper">
            <p className="Signin-page-paragraph">
              Secure solution for your digital money
            </p>
            <form
              className="Signin-page-form"
              onSubmit={handleSubmit((data) => handleSignin(data))}
            >
              <input type="text" placeholder="email" {...register("email")} />
              {errors.email && <span>{errors.email.message}</span>}
              <input
                type="password"
                placeholder="password"
                className="passwordInput"
                {...register("password")}
              />
              {SigninError ? (
                <span className="error-message">{SigninError.message}</span>
              ) : (
                ""
              )}
              <Button className="SigninBtn" type="submit" size="lg" variant="default">
                <span>Sign In</span>
              </Button>
            </form>
          </div>
          <span>Or sign in with</span>
          <Button variant="default" onClick={signInWithGoogle}>
            <FcGoogle />
            Sign in with Google
          </Button>
          <span className="Signin-message">
            Forgot password? · Don't have an account?{" "}
            <Link to="/auth/signup">Sign Up</Link>
          </span>
        </div>
        <div className="testimonial">
          <h2 className="testimonial-primary">5K+ WALLETS</h2>
          <span className="testimonial-secondary">300K+ TRANSACTIONS</span>
        </div>
      </main>
    </div>
  );
};

export default SigninPage;
