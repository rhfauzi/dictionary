import React, { useEffect, useState } from 'react'
import menuSales from './menu-sales'
import menuLogistic from './menu-logistic'
import { PATH } from '../path'
import { menuSFA } from './menu-sfa'
import menuMarketing from './menu-marketing'

export default function setMenu(path: string) {
  const { logisticMenu } = menuLogistic()
  const { salesMenu } = menuSales()
  const { marketingMenu } = menuMarketing()
  const [menuActived, setMenuActived] = useState<any>(salesMenu)

  useEffect(() => {
    if (path === PATH.HOME) setMenuActived(salesMenu)
    if (path === PATH.SALES) setMenuActived(salesMenu)
    if (path === PATH.LOGISTIC) setMenuActived(logisticMenu)
    if (path === PATH.SFA) setMenuActived(menuSFA)
    if (path === PATH.MARKETING) setMenuActived(marketingMenu)
  }, [path])

  return { menuActived }
}
