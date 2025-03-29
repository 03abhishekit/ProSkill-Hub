
import React from 'react'
import { useLoadUserQuery } from './features/api/authApi';
import LoadingSpinner from "./components/LoadingSpinner";
const AppWrapper = ({ children }) => {
        
    const { isLoading } = useLoadUserQuery();
  return (
    <>
        {
        isLoading ? 
        <LoadingSpinner/>: 
        children
        } 
      
    </>
  )
}

export default AppWrapper



