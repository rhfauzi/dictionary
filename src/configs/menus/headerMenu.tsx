/* eslint-disable no-return-assign */
import React from 'react'
import Link from 'next/link'
import { PATH } from './path'

export const headerMenu = [
  {
    path: '/dashboard?menu=config',
    label: <div onClick={() => (window.location.href = '/dashboard?menu=config')}>Config</div>,
  },
  {
    path: '/dashboard?menu=mdm',
    label: (
      <div onClick={() => (window.location.href = '/dashboard?menu=mdm')}>
        Master Data Management
      </div>
    ),
  },
  {
    path: '/fico',
    label: <div onClick={() => (window.location.href = '/fico')}>Finance</div>,
  },
  {
    path: PATH.SALES,
    label: <Link href={{ pathname: '/sales' }}>Sales</Link>,
  },
  {
    path: PATH.LOGISTIC,
    label: <Link href={{ pathname: '/logistic' }}>Logistic</Link>,
  },
  {
    path: PATH.MARKETING,
    label: <Link href={{ pathname: '/marketing' }}>Marketing</Link>,
  },
]
