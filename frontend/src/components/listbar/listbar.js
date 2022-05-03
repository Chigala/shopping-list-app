import React from 'react'
import { useSelector } from 'react-redux'
import { ItemForm } from './item-form/item-form'
import { Item } from './item/item'
import { Cart } from './cart/cart'

export const ListBar = () => {
    const screen = useSelector(state=> state.componentSlice.screen);
    console.log(`this is the screen: ${screen}`)
  const switchViews = data => {
    switch (data) {
      case 'items':
        return <Item />
      case 'item-form':
        return <ItemForm />
      default:
        return <Cart />
    }
  }
  return <div>{switchViews(screen)}</div>
}
