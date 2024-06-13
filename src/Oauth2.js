import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    console.log(accessToken);

    if (accessToken) {
      // Store the access token in localStorage
      localStorage.setItem('ACCESS_TOKEN', accessToken);
      // Redirect to the main page
      navigate('/');
    } else {
      // If no access token is present, handle the error
      console.error('Access token not found in the URL');
      // Optionally, you can redirect to an error page or show an error message
    }
  }, [navigate]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default LoginRedirect;
