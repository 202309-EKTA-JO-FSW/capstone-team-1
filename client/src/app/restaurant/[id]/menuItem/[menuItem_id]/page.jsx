import SingleMenuItem from '@/app/components/menuItems/SingleMenuItem'
import React from 'react'

const SingleMenuItemPage = ({params}) => {
  const id= params.id;
  return (
    <div><SingleMenuItem id={id}/></div>
  )
}

export default SingleMenuItemPage