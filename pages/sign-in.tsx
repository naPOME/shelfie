import AuthForm from "@/app/components/authForm";
;

const SignInPage: React.FC = () => {
  const handleSignIn = (email: string, password: string) => {
    // Handle sign-in logic here
  };

  return <AuthForm type="login" onSubmit={handleSignIn} />;
};

export default SignInPage;
