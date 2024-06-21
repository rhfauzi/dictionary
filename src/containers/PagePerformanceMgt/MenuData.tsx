import {
  ICHCKPIFolder,
  ICHCKPITarget,
  ICHCKStarPerspectiveMatte,
  ICHCPerspectiveMatte,
  ICHCPerspectiveMonitoring,
  ICHCPerspectiveResult,
} from 'src/assets'

export const performanceMgtMenu = [
  {
    id: 0,
    name: 'KPI Setting',
    bg: 'linear-gradient(180deg, hsla(231, 60%, 61%, 1) 30%, hsla(338, 100%, 90%, 1) 100%)',
    img: ICHCPerspectiveMatte,
    path: '/kpi-setting',
    position: 'center',
  },
  {
    id: 1,
    name: 'KPI Result',
    bg: 'linear-gradient(180deg, hsla(209, 50%, 55%, 1) 0%, hsla(75, 100%, 88%, 1) 100%)',
    img: ICHCPerspectiveResult,
    path: '/kpi-result',
    position: 'center',
  },
  {
    id: 2,
    name: 'KPI Monitoring',
    bg: 'linear-gradient(180deg, hsla(162, 95%, 70%, 1) 0%, hsla(206, 100%, 90%, 1) 100%)',
    img: ICHCPerspectiveMonitoring,
    path: '/kpi-monitoring',
    position: 'center',
  },
  {
    id: 3,
    name: 'Master KPI',
    bg: 'linear-gradient(180deg, hsla(209, 41%, 70%, 1) 0%, hsla(214, 53%, 92%, 1) 100%)',
    img: ICHCKPIFolder,
    path: '/master-kpi',
    position: 'center',
  },
  {
    id: 4,
    name: 'KPI Target',
    bg: 'linear-gradient(180deg, hsla(356, 100%, 87%, 1) 0%, hsla(41, 100%, 91%, 1) 100%)',
    img: ICHCKPITarget,
    path: '/kpi-target',
    position: 'center',
  },
  {
    id: 5,
    name: 'Performance Rating',
    bg: 'linear-gradient(180deg, hsla(184, 66%, 55%, 1) 0%, hsla(185, 63%, 80%, 1) 100%)',
    img: ICHCKStarPerspectiveMatte,
    path: '/performance-rating',
    position: 'center',
  },
]
