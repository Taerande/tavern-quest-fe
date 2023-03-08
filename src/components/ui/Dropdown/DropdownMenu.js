import React, { useState } from 'react';
import styles from './DropdownMenu.module.css';

function DropdownMenu(props) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return <>
    {props.isOpen && <div className={styles['dropdown-menu']} onClick={props.onChnageOpen}>
      <ul className={styles['option-container']}>
        {props.children}
      </ul>
    </div>}
    {!props.isOpen && <div className={styles['dropdown-menu']} onClick={props.onChnageOpen}>
    </div>}
  </>
}

export default DropdownMenu;
