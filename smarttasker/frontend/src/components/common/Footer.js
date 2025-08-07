const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-4">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} SmartTasker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;