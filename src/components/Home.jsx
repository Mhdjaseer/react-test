// this page is the addFav page content 

import React from 'react'
import { IoLinkSharp } from "react-icons/io5";
import SearchComponent from './SearchComponent';

export const Home = () => {
  return (
    <div className='Home'>
        <div className="content">
            <div className="api">
            <a href="https://api.npms.io/v2/search?q=reactjs" className='api-link'> 
            <IoLinkSharp className="api-icon" />https://api.npms.io/v2/search?q=reactjs
            </a>
        </div>
        <div className="search">
            <SearchComponent/>

        </div>
        </div>

    </div>
  )
}
