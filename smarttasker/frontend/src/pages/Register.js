import AuthForm from '../components/AuthForm';

const Register = () => {
  return (
    <div className="auth-page">
      <AuthForm isLogin={false} />
    </div>
  );
};

export default Register;