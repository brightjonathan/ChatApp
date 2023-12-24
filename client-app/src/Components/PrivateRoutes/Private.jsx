import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';

const Private = () => {
    const {currentUser} = useSelector(state => state.user);
  return (
    <div>
    { currentUser ? (<Outlet/>) : (<Navigate to={'/login'}/>)}  
    </div>
  )
}

export default Private;
