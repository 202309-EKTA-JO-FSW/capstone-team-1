const GoogleAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/api/auth/google";
  };
  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleAuth;
