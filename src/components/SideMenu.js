import React, { useState, useEffect, createRef } from 'react'
import logo from '../assets/logo.png'
import user from '../assets/user.jpg'
import MenuItem from './MenuItem';
import './css/SideMenu.css';

const menuItems = [
    { name: 'Usuarios', to: '/', iconClass: 'bi bi-people-fill' },
    { name: 'Nuevo Usuario', to: '/new-user', iconClass: 'bi bi-person-plus-fill' },
    {
        name: 'Perfil', to: '/profile', iconClass: 'bi bi-person-fill', subMenus: [
            { name: 'Detalle', to: '/profile/details' },
            { name: 'Desconectarse', to: '/profile/logout' }
        ]
    },
]

function useOutsideAlerter(ref) {
    
  }

const SideMenu = (props) => {

    const [inactive, setInactive] = useState(true);

    const searchInputRef = createRef();
    const sidebarRef = createRef();

    const expandSidebar = () => {
        if (inactive) {
            setInactive(false);
        }
    }

    useEffect(() => {
        props.onCollapse(inactive);
    }, [inactive]);

    useEffect(() => {
        function handleClickOutside(event) {
          if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            if (!inactive) {
                setInactive(true);
            }
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [sidebarRef]);


    return (
        <div ref={sidebarRef} className={`side-menu ${inactive ? 'inactive' : ''}`}>
            <div className='top-section'>
                <div className='logo'>
                    <img src={logo} alt='Brand Logo' />
                </div>
                <div onClick={() => setInactive(!inactive)} className='toggle-menu-btn'>
                    {inactive ? <i class="bi bi-arrow-right-square-fill"></i> : <i class="bi bi-arrow-left-square-fill"></i>}
                </div>
            </div>
            <div onClick={() => {
                expandSidebar();
                searchInputRef.current.focus();
            }} className='search-controller'>
                <button className='search-btn'>
                    <i class="bi bi-search"></i>
                </button>
                <input type="text" placeholder='search' ref={searchInputRef} />
            </div>

            <div className='divider'></div>

            <div className='main-menu'>
                <ul>
                    {
                        menuItems.map((item, index) => (
                            <MenuItem
                                key={index}
                                name={item.name}
                                to={item.to}
                                subMenus={item.subMenus || []}
                                iconClass={item.iconClass}
                                onClick={() => expandSidebar()}
                                inactive={inactive}
                            />
                        ))
                    }
                </ul>
            </div>
            <div className='side-menu-footer'>
                <div className='avatar'>
                    <img src={user} alt='user' />
                </div>
                <div className='user-info'>
                    <h5>Edgardo Martinez</h5>
                    <p>test@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default SideMenu