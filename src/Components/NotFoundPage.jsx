import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="404 Not Found"
        className="w-60 h-60 mb-6"
      />
      <h1 className="text-4xl font-bold text-red-600 mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
