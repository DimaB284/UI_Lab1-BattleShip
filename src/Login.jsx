import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = existingUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/game');
    } else {
      alert('Wrong email or password. Try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-sm mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input type="email" name="email" required onChange={handleChange} 
                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input type="password" name="password" required onChange={handleChange} 
                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <button type="submit" className="mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition font-bold">
          Authorize
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Are you new here? <Link to="/register" className="text-indigo-600 hover:underline">Register!</Link>
      </p>
    </div>
  );
}