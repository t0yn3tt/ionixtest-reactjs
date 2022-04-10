import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';

const MenuItem = (props) => {
    const { name, subMenus, iconClass, onClick, inactive, to } = props;
    const [expand, setExpand] = useState(false);

    return (

        <li onClick={onClick}>
            <NavLink to={to} onClick={() => setExpand(!expand) } className='menu-item'>
                <div className='menu-icon'>
                    <i class={iconClass}></i>
                </div>
                <span>
                    {name}
                </span>
            </NavLink>
            {
                subMenus && subMenus.length > 0 ?
                    <ul className={`sub-menu ${(expand && !inactive) ? 'active' : ''}`}>
                        {subMenus.map((menu, index) => (
                            <li key={index}>
                                <NavLink to={menu.to}>
                                    {menu.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul> : null
            }

        </li>
    )
}

export default MenuItem