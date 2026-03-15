import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    dob: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    if (existingUsers.some(user => user.email === formData.email)) {
      alert('Player with this email is already registered!');
      return;
    }

    existingUsers.push(formData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    alert('Register is successful!.');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div>
          <label className="block text-sm font-medium mb-1">Name:</label>
          <input type="text" name="name" required onChange={handleChange} 
                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input type="email" name="email" required onChange={handleChange} 
                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input type="password" name="password" required minLength="6" onChange={handleChange} 
                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sex:</label>
          <select name="gender" required onChange={handleChange} 
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Choose your sex...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date of birth:</label>
          <input type="date" name="dob" required onChange={handleChange} 
                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <button type="submit" className="mt-4 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition font-bold">
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
       Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
      </p>
    </div>
  );
}