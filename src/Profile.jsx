import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold mb-4">You are not authroized!</h2>
        <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 border rounded-lg shadow-sm mt-10">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 border-b pb-2">Your profile</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-b">
              <th className="py-3 px-4 bg-slate-50 text-slate-700 w-1/3">Nickname:</th>
              <td className="py-3 px-4 font-medium">{user.name}</td>
            </tr>
            <tr className="border-b">
              <th className="py-3 px-4 bg-slate-50 text-slate-700">Email:</th>
              <td className="py-3 px-4">{user.email}</td>
            </tr>
            <tr className="border-b">
              <th className="py-3 px-4 bg-slate-50 text-slate-700">Sex:</th>
              <td className="py-3 px-4">
                {user.gender === 'male' ? 'Male' : user.gender === 'female' ? 'Female' : 'Other'}
              </td>
            </tr>
            <tr>
              <th className="py-3 px-4 bg-slate-50 text-slate-700">Date of birth:</th>
              <td className="py-3 px-4">{user.dob}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button onClick={handleLogout} className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-bold">
        Exit game
      </button>
    </div>
  );
}