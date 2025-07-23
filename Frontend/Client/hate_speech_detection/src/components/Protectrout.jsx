import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Protectrout() {
  let id = Cookies.get('id');
  return (
    <div>
      {id ? <Outlet/> : <Navigate to ="/Login"/>}
    </div>
  )
}
