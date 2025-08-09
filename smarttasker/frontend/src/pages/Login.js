import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    <div className="auth-page">
      <AuthForm isLogin={true} />
    </div>
  );
};

export default Login;