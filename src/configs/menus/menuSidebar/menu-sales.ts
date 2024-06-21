import Router from 'next/router'
import * as NabatiIcons from 'src/assets'
import { PATH } from '../path'

export default function menuLogistic() {
  const CreateMenu = (
    key?: string,
    title?: string,
    type?: string,
    icon?: any,
    content?: () => string,
    onClick?: () => Promise<boolean>,
    children?: any[],
  ) => ({
    key,
    title,
    type,
    icon,
    content,
    onClick,
    children,
  })

  const salesMenu = [
    CreateMenu('overview', 'Overview', 'title'),
    CreateMenu(
      'dashboard',
      'Dashboard',
      null,
      NabatiIcons.ICInventory,
      () => 'Dashboard',
      () => Router.push(PATH.SALES),
    ),
  ]

  return { salesMenu }
}
