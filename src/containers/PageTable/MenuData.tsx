import {
  ICHCBuilding,
  ICHCOfficeBag,
  ICHCBankBuilding,
  ICHCFlag,
  ICHCPuzzle,
  ICHCAddApp,
  ICHCBiodata,
  ICHCNotebook,
  ICHCWorld,
} from 'src/assets'

export const masterDataMenu = [
  {
    id: 0,
    name: 'Table Sub Column Simple',
    bg: 'linear-gradient(180deg, #BFE039, #BFE039, #FFF0B9, transparent)',
    img: ICHCBuilding,
    path: '/table-sub-columns',
  },
  {
    id: 1,
    name: 'Department & Division',
    bg: 'linear-gradient(180deg, #94B4D2, #94B4D2, #DEE8F5, transparent)',
    img: ICHCOfficeBag,
    path: '/department-and-division',
  },
  {
    id: 2,
    name: 'Legal Entity',
    bg: 'linear-gradient(180deg, #D4E4FC, #D4E4FC, #E4E7FF, transparent)',
    img: ICHCBankBuilding,
    path: '/legal-entity',
  },
  // {
  //   id: 3,
  //   name: 'Job Scope',
  //   bg: 'linear-gradient(180deg, #0CBC8B, #0CBC8B, #97F3FF, transparent)',
  //   img: ICHCComputer,
  //   path: '/job-scope',
  // },
  {
    id: 4,
    name: 'Job Grade',
    bg: 'linear-gradient(180deg, #2BBECB, #2BBECB, #FDE6F3, transparent)',
    img: ICHCFlag,
    path: '/job-grade',
  },
  {
    id: 5,
    name: 'Job Family',
    bg: 'linear-gradient(180deg, #F6B8AC, #F6B8AC, #96E0C9, transparent)',
    img: ICHCPuzzle,
    path: '/job-family',
    position: 'center',
  },
  {
    id: 6,
    name: 'Sub Job Family',
    bg: 'linear-gradient(180deg, #AD8DFF, #AD8DFF, #E4E7FF, transparent)',
    img: ICHCAddApp,
    path: '/sub-job-family',
  },
  {
    id: 7,
    name: 'Job Title',
    bg: 'linear-gradient(180deg, #C8DEFF, #C8DEFF, #FFF9E1, transparent)',
    img: ICHCBiodata,
    path: '/job-title',
  },
  {
    id: 8,
    name: 'Job Code',
    bg: 'linear-gradient(180deg, #93E2E7, #93E2E7, #FFF9E1, transparent)',
    img: ICHCNotebook,
    path: '/job-code',
  },
  {
    id: 8,
    name: 'Country',
    bg: 'linear-gradient(180deg, #B6E1FF, #B6E1FF, #E4E7FF, transparent)',
    img: ICHCWorld,
    path: '/country',
    position: 'center',
  },
]
