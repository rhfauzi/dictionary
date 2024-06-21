export const dataQuestions = [
  {
    id: 1,
    title: 'The Legal Entity Name',
    questionEng: 'What is the name of the legal entity?',
    questionInd: 'Apa nama entitas legalnya?',
    require: true,
    data: [
      {
        type: 'select',
        options: [
          { id: 1, value: 'PP01', label: 'PT. Kaldu Sari Nabati Indonesia (KSNI)' },
          { id: 2, value: 'PP02', label: 'PT. Kaldu Sari Nutrisun Indonesia (NSU)' },
          { id: 3, value: 'PP03', label: 'PT. Richeese Kuliner Indonesia (RKI)' },
          { id: 4, value: 'PP04', label: 'PT. Pinus Merah Abadi (PMA)' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Division Name',
    questionEng: 'What is the name of the division?',
    questionInd: 'Apa nama divisi yang ditempati?',
    require: true,
    data: [
      {
        type: 'select',
        options: [
          { id: 1, value: 'Market Research', label: 'Market Research' },
          { id: 2, value: 'Concept & Innovation', label: 'Concept & Innovation' },
          { id: 3, value: 'Research & Development', label: 'Research & Development' },
          { id: 4, value: 'Retail Business Development', label: 'Retail Business Development' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Department Name',
    questionEng: 'What is the name of the department?',
    questionInd: 'Apa nama departemen yang ditempati?',
    require: true,
    data: [
      {
        type: 'select',
        options: [
          { id: 1, value: 'Department Market Research', label: 'Department Market Research' },
          { id: 2, value: 'Department Concept', label: 'Department Concept' },
          { id: 3, value: 'Department Research & Development', label: 'Department Research & Development' },
          { id: 4, value: 'Department Retail', label: 'Department Retail' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Business Title',
    questionEng: 'What is business title?',
    questionInd: 'Apa nama posisi jabatan?',
    require: true,
    data: [
      {
        type: 'select',
        options: [
          { id: 1, value: 'Chief Commercial Marketing', label: 'Chief Commercial Marketing' },
          { id: 2, value: 'Senior Marketing Manager', label: 'Senior Marketing Manager' },
          { id: 3, value: 'Senior Sales Manager', label: 'Senior Sales Manager' },
          { id: 4, value: 'Senior Social Media Manager', label: 'Senior Social Media Manager' },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Reporting Line',
    questionEng: 'What is the supervisor name?',
    questionInd: 'Siapa nama atasannya?',
    require: true,
    data: [
      {
        type: 'select',
        options: [
          { id: 1, value: 'Ahmad Junaidi', label: 'Ahmad Junaidi' },
          { id: 2, value: 'Bagus Sunaryo', label: 'Bagus Sunaryo' },
          { id: 3, value: 'Caca Cia', label: 'Caca Cia' },
          { id: 4, value: 'Doni Rotimpulo', label: 'Doni Rotimpulo' },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Number of Subordinate',
    questionEng: 'How much subordinate number?',
    questionInd: 'Berapa banyak jumlah bawahan?',
    require: true,
    data: [
      {
        type: 'select',
        options: [
          { id: 1, value: '1-10', label: '1-10' },
          { id: 2, value: '11-25', label: '11-25' },
          { id: 3, value: '26-50', label: '26-50' },
          { id: 4, value: '50+', label: '50+' },
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Geographical Responsibility',
    questionEng: 'Geographical of job resposibility?',
    questionInd: 'Lingkup wilayah geography pekerjaan?',
    require: true,
    data: [
      {
        type: 'select',
        options: [
          { id: 1, value: 'Within part of a plant / part of a site / part of BU / part of an outlet / office', label: 'Within part of a plant / part of a site / part of BU / part of an outlet / office' },
          { id: 2, value: 'One plant / a site / domestic region', label: 'One plant / a site / domestic region' },
          { id: 3, value: 'One country / multiple plant / one site within a country ', label: 'One country / multiple plant / one site within a country ' },
          { id: 4, value: 'Nabati group', label: 'Nabati group' },
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Position Purpose',
    questionEng: 'Purpose of Position?',
    questionInd: 'Tujuan Adanya Jabatan Ini?',
    require: true,
    data: [
      {
        type: 'input',
        labelEng: 'Why this position exist?',
        labelInd: 'Kenapa posisi ini ada?',
        options: [],
      },
      {
        type: 'input',
        labelEng: 'Do it have profit & Loss Responsibility?',
        labelInd: 'Apakah posisi ini ada tanggung jawab terhadapa laporan PnL?',
        options: [],
      },
    ],
  },
  {
    id: 9,
    title: 'Network Interaction',
    questionEng: 'Network interaction?',
    questionInd: 'Hubungan kerja?',
    require: true,
    data: [
      {
        type: 'input',
        labelEng: 'External Parties Coordination?',
        labelInd: 'Koordinasi Pihak Eksternal?',
        options: [],
      },
      {
        type: 'input',
        labelEng: 'Internal Parties Coordination?',
        labelInd: 'Koordinasi Pihak Internal?',
        options: [],
      },
    ],
  },
  {
    id: 10,
    title: 'Requirements',
    questionEng: 'Requirements?',
    questionInd: 'Persyaratan?',
    require: true,
    data: [
      {
        type: 'select',
        labelEng: 'Minimum Education Background?',
        labelInd: 'Latar Belakang Pendidikan Terendah?',
        options: [
          { id: 1, value: 'High School (SMA/SMK)', label: 'High School (SMA/SMK)' },
          { id: 2, value: 'Diploma/ Advance Diploma (D1-D3)', label: 'Diploma/ Advance Diploma (D1-D3)' },
          { id: 3, value: 'Bachelor Degree (S1/D4)', label: 'Bachelor Degree (S1/D4)' },
          { id: 4, value: 'Master Degree (S2)', label: 'Master Degree (S2)' },
        ],
      },
      {
        type: 'select',
        labelEng: 'Minimum Experience ?',
        labelInd: 'Lama Pengalaman Terendah ?',
        options: [
          { id: 1, value: '0-2 Years (fresh Graduate)', label: '0-2 Years (fresh Graduate)' },
          { id: 2, value: '2-4 Years', label: '2-4 Years' },
          { id: 3, value: '5-7 Years', label: '5-7 Years' },
          { id: 4, value: '7+ Years', label: '7+ Years' },
        ],
      },
    ],
  },
  {
    id: 11,
    title: 'Competency',
    questionEng: 'Competency?',
    questionInd: 'Kompetensi?',
    require: true,
    data: [
      {
        type: 'selectStars',
        labelEng: 'Behavioral Competencies ?',
        labelInd: 'Kompetensi Prilaku ?',
        options: [
          { id: 1, value: 'Communication', label: 'Communication' },
          { id: 2, value: 'Leadership', label: 'Leadership' },
          { id: 3, value: 'Creativity', label: 'Creativity' },
          { id: 4, value: 'Result Oriented', label: 'Result Oriented' },
        ],
      },
      {
        type: 'selectStars',
        labelEng: 'Technical Competencies ?',
        labelInd: 'Kompetensi Teknis ?',
        options: [
          { id: 1, value: 'Project Management', label: 'Project Management' },
          { id: 2, value: 'Quality Assurance', label: 'Quality Assurance' },
          { id: 3, value: 'Standard & Noms', label: 'Standard & Noms' },
          { id: 4, value: 'Lean Manufacturing', label: 'Lean Manufacturing' },
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Key Resposibilities',
    questionEng: 'Key Resposibilities?',
    questionInd: 'Tanggung Jawab?',
    require: true,
    data: [
      {
        type: 'textarea',
        options: [],
      },
    ],
  },
  {
    id: 13,
    title: 'Key Performance Indicators',
    questionEng: 'Key Performance Indicators?',
    questionInd: 'Indikator Kinerja Utama?',
    require: true,
    data: [
      {
        type: 'selectCheckbox',
        options: [
          { id: 1, value: 'EBITDA', label: 'EBITDA' },
          { id: 2, value: 'NET SALES', label: 'NET SALES' },
          { id: 3, value: 'TRIR', label: 'TRIR' },
          { id: 4, value: 'LTIR', label: 'LTIR' },
        ],
      },
    ],
  },
  {
    id: 14,
    title: 'Home Base',
    questionEng: 'Where is your home base?',
    questionInd: 'Dimana lokasi kerja Anda?',
    require: true,
    data: [
      {
        type: 'select',
        options: [
          { id: 1, value: 'Head Quarter (HQ)', label: 'Head Quarter (HQ)' },
          { id: 2, value: 'Business Unit Head Office', label: 'Business Unit Head Office' },
          { id: 3, value: 'Branch Office', label: 'Branch Office' },
          { id: 4, value: 'Plat/Manufacturing Site', label: 'Plat/Manufacturing Site' },
          { id: 5, value: 'Distirbution Center (DC)', label: 'Distirbution Center (DC)' },
        ],
      },
    ],
  },
  {
    id: 15,
    title: 'Decision for Financial Approval',
    questionEng: 'Decision for financial approval?',
    questionInd: 'Keputusan untuk persetujuan keuangan?',
    require: false,
    data: [
      {
        type: 'select',
        options: [
          { id: 1, value: 'None', label: 'None' },
          { id: 2, value: 'USD $1.000', label: 'USD $1.000' },
          { id: 3, value: 'USD $1.001 - USD $5.000', label: 'USD $1.001 - USD $5.000' },
          { id: 4, value: 'USD $5.001 - USD $15.000', label: 'USD $5.001 - USD $15.000' },
          { id: 5, value: 'USD $15.001 ++', label: 'USD $15.001 ++' },
        ],
      },
    ],
  },
]