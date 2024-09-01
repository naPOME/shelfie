import AuthForm from "@/app/components/authForm";


const SignUpPage: React.FC = () => {
  const handleSignUp = (email: string, password: string) => {
    // Handle sign-up logic here
  };

  return <AuthForm type="signup" onSubmit={handleSignUp} />;
};

export default SignUpPage;
