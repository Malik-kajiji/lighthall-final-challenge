/* eslint-disable jsx-a11y/no-redundant-roles */
import React,{useState} from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useDispatch,useSelector } from 'react-redux';
import { themeActions } from '../redux/Theme';
import type { RootState } from '../config/store';
import { FiLogOut } from 'react-icons/fi';
import { CgGym } from 'react-icons/cg';
import { FiUsers,FiBarChart2 } from 'react-icons/fi';
import { auth } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { alertActions } from '../redux/AlertController';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const theme = useSelector((state:RootState )=> state.theme.mode);
    const currentPage = useSelector((state:RootState) => state.currentPage.page);

    function handleLogOut(){
        signOut(auth)
        .then(()=>{
            navigate('/')
            dispatch(alertActions.showAlert({msg:'logged out successfully',type:'success'}))
        })
    }

    function handleClick() {
        dispatch(themeActions.toggleTheme({}))
    }

    return (
        <aside className='sidebar'>
            <div className='top'>
                <h2 className='logo'>
                    <p>Gym</p>
                    <span>Tracker</span>
                </h2>
                <button className={`theme-btn ${theme === 'dark' && 'dark'}`} onClick={handleClick}>
                    <span className='bullet'></span>
                </button>
            </div>
            <ul role='list'>
                <li>
                    <Link to={'/'}  className={`${currentPage === 'home' && 'active'}`}>
                        <span>
                            Home
                        </span>
                        <span className='icon'>
                            {AiOutlineHome({})}
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to={'/routine'} className={`${currentPage === 'routine' && 'active'}`}>
                        <span>
                            Workout routine
                        </span>
                        <span className='icon'>
                            {CgGym({})}
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to={'progress'}  className={`${currentPage === 'progress' && 'active'}`}>
                        <span>
                            Progress
                        </span>
                        <span className='icon'>
                            {FiBarChart2({})}
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to={'partners'}  className={`${currentPage === 'partners' && 'active'}`}>
                        <span>
                            Partners
                        </span>
                        <span className='icon'>
                            {FiUsers({})}
                        </span>
                    </Link>
                </li>
            </ul>
            <button className='logOut' onClick={handleLogOut}>
                <p className='name'>
                    {auth.currentUser?.displayName}
                </p>
                <p className='email'>
                    {auth.currentUser?.email}
                </p>
                <span className='icon'>
                    {FiLogOut({})}
                </span>
            </button>
        </aside>
    )
}

export default Sidebar