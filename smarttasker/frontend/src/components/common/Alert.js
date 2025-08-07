const Alert = ({ type, message }) => {
  const alertClasses = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className={`${alertClasses[type]} px-4 py-3 rounded mb-4`}>
      {message}
    </div>
  );
};

export default Alert;