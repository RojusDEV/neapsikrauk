import { supabase } from "../supabaseClient";

type signupProps = {
  email: string;
  full_name: string;
  password: string;
};

type signinProps = {
  email: string;
  password: string;
};

export const signupUser = async (credentials: signupProps) => {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        full_name: credentials.full_name,
        redirect: "/dashboard"
      },
    },
  });
  return { data, error };
};

export const signinUser = async (credentials: signinProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
  return { data, error };
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "dashboard",
    },
  });
  return { data, error };
};
