import React from "react"
import * as style from './style'
import navLinks from "../../../utils/navLinks"

const Nav = ({$isOpen})=>{
        return (
            <style.NavList $isOpenMenu={$isOpen}>
              {navLinks.map((item, index) => (
                <style.NavItem key={index} to={item.to} end={item.end}>
                  {item.content}
                </style.NavItem>
              ))}
              {$isOpen &&
                <style.NavItem to="cart">
                  Cart
                </style.NavItem>}
            </style.NavList>
          )
}

export default Nav