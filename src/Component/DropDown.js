
import { Link } from 'react-router-dom';

function Dropdown({ currentUser,toggleMenu,handleLogOut }) {
  

  return (
    <div className="relative ">
      
        <div className="absolute z-10 -right-5 top-5 mt-2 w-48 bg-slate-100 rounded-lg shadow-xl">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            {currentUser?(
                <>                         
                    <Link to="/attendance">
                        <li className='hidden md:inline font-semibold hover:underline cursor-pointer text-black'>Attendance</li>
                    </Link>
                    <Link to={`/profile/${currentUser._id}`}>
                        <li className='hidden md:inline font-semibold hover:underline cursor-pointer text-black'>{currentUser?currentUser.name.split(" ")[0] : "Profile"}</li>
                    </Link>
                    <li className='hidden md:inline font-semibold hover:underline cursor-pointer text-black' onClick={handleLogOut}>Log-Out</li>
                </>   
            ):(
                <Link to="/sign-in">
                    <li className='hidden md:inline font-semibold hover:underline cursor-pointer text-black'>Sign-in</li>
                </Link>
            )}
          </ul>
        </div>
    </div>
  );
}

export default Dropdown;
