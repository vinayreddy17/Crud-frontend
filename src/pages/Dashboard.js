import React,{useContext} from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar />
      Dashboard
      <h2>welcome{user} </h2>
      <p> To manage and take care of employee details click on the employeelist option shown at the top of the page or the button below</p>
      <Link to="/employees">
        <button>employeelist</button>
      </Link>
      </div>
  )
}

export default Dashboard