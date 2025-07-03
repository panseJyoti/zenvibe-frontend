import { useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const msgKey = searchParams.get('msg');
  console.log("status:", status);
  console.log("msgKey:", msgKey);

  const success = status === 'success';

  // Mapping msgKey to human-readable messages
  const messages = {
    verified: 'Your email has been successfully verified!',
    already_verified: 'Your email is already verified. You can log in now.',
    user_created: 'Email verified! Your account has been created.',
    invalid_token: 'Invalid or expired verification link.',
  };

  const displayMessage = messages[msgKey] || 'Something went wrong.';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 transition-all px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 sm:p-10 max-w-lg w-full text-center space-y-6">
        {status === null ? (
          <div className="text-gray-700 dark:text-gray-300 text-sm">Verifying your email...</div>
        ) : (
          <>
            {success && (
              <img
                src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                alt="Verified"
                className="w-16 h-16 mx-auto"
              />

            )}

            <h2
              className={`text-xl font-bold ${success ? 'text-gray-800 dark:text-white' : 'text-red-600'
                }`}
            >
              {success ? 'Email Verified!' : 'Verification Failed'}
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300">{displayMessage}</p>

            {success && (
              <a
                href="/sign-in"
                className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-[#FF00CC] to-[#481D39] text-white font-medium text-sm rounded-lg shadow-md hover:opacity-90 transition"
              >
                Login Now
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
