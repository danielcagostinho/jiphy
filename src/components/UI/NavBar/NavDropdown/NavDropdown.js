// Library Imports
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router";
import { IsMobile } from "../../../../hooks/useWindowSize";

// CSS Imports
import "./NavDropdown.scss";

const NavDropdown = ({ children, icon, role }) => {

  const dropdownVariants = {
    show: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const iconRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const [dropdownPosition, setDropdownPosition] = useState(0);
  let dropdownClass = IsMobile() ? "DropdownContentMobile" : "DropdownContent";

  const onToggleDropdown = () => {
    if (!showDropdown) {
      openDropdown();
    } else {
      closeDropdown();
    }
  };

  const openDropdown = () => {
    setShowDropdown(true);
    document.addEventListener("mousedown", onClickOutsidedDropdown, true);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
    document.removeEventListener("mousedown", onClickOutsidedDropdown, true);
  };

  const onClickOutsidedDropdown = (e) => {
    e.preventDefault();
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !iconRef.current.contains(e.target)
    ) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (iconRef.current) {
      setDropdownPosition(window.innerWidth - iconRef.current.getBoundingClientRect().right - 8);
    }
  }, [iconRef])

  useEffect(() => {
    closeDropdown();
  }, [location.pathname])


  return (
    <div className="NavDropdown" key={role}>
      <div className="DropdownIconContainer">
        <span
          className="material-icons DropdownIcon"
          onClick={onToggleDropdown}
          ref={iconRef}
        >
          {!showDropdown ? icon : "cancel"}
        </span>
      </div>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            key="dropdown"
            initial={dropdownVariants.hidden}
            animate={dropdownVariants.show}
            exit={dropdownVariants.hidden}
            variants={dropdownVariants}
            style={{ right: dropdownPosition }}
            ref={dropdownRef}
            className={dropdownClass}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;
