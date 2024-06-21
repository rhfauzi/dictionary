import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'

const overrideBaseUrlPMA = process.env.NEXT_PUBLIC_API_BASE_DEV

export const uploadImages = async (payload: any): Promise<any> => {
  const formData = new FormData();
  formData.append('file', payload?.file?.originFileObj)
  formData.append('type', payload?.type)
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/employee-self-service/upload',
    data: formData,
    // options: { responseType: 'blob' },
  })
  return response?.data
}

export const getCountryOfbirth = async (search: any): Promise<any> => {
  const response = [
    { id: 0, label: 'Afghanistan', value: 'Afghanistan' },
    { id: 1, label: 'Albania', value: 'Albania' },
    { id: 2, label: 'Algeria', value: 'Algeria' },
    { id: 3, label: 'Andorra', value: 'Andorra' },
    { id: 4, label: 'Angola', value: 'Angola' },
    { id: 5, label: 'Antigua & Deps', value: 'Antigua & Deps' },
    { id: 6, label: 'Argentina', value: 'Argentina' },
    { id: 7, label: 'Armenia', value: 'Armenia' },
    { id: 8, label: 'Australia', value: 'Australia' },
    { id: 9, label: 'Austria', value: 'Austria' },
    { id: 10, label: 'Azerbaijan', value: 'Azerbaijan' },
    { id: 11, label: 'Bahamas', value: 'Bahamas' },
    { id: 12, label: 'Bahrain', value: 'Bahrain' },
    { id: 13, label: 'Bangladesh', value: 'Bangladesh' },
    { id: 14, label: 'Barbados', value: 'Barbados' },
    { id: 15, label: 'Belarus', value: 'Belarus' },
    { id: 16, label: 'Belgium', value: 'Belgium' },
    { id: 17, label: 'Belize', value: 'Belize' },
    { id: 18, label: 'Benin', value: 'Benin' },
    { id: 19, label: 'Bhutan', value: 'Bhutan' },
    { id: 20, label: 'Bolivia', value: 'Bolivia' },
    { id: 21, label: 'Bosnia Herzegovina', value: 'Bosnia Herzegovina' },
    { id: 22, label: 'Botswana', value: 'Botswana' },
    { id: 23, label: 'Brazil', value: 'Brazil' },
    { id: 24, label: 'Brunei', value: 'Brunei' },
    { id: 25, label: 'Bulgaria', value: 'Bulgaria' },
    { id: 26, label: 'Burkina', value: 'Burkina' },
    { id: 27, label: 'Burundi', value: 'Burundi' },
    { id: 28, label: 'Cambodia', value: 'Cambodia' },
    { id: 29, label: 'Cameroon', value: 'Cameroon' },
    { id: 30, label: 'Canada', value: 'Canada' },
    { id: 31, label: 'Cape Verde', value: 'Cape Verde' },
    { id: 32, label: 'Central African Rep', value: 'Central African Rep' },
    { id: 33, label: 'Chad', value: 'Chad' },
    { id: 34, label: 'Chile', value: 'Chile' },
    { id: 35, label: 'China', value: 'China' },
    { id: 36, label: 'Colombia', value: 'Colombia' },
    { id: 37, label: 'Comoros', value: 'Comoros' },
    { id: 38, label: 'Congo', value: 'Congo' },
    { id: 39, label: 'Congo {Democratic Rep}', value: 'Congo {Democratic Rep}' },
    { id: 40, label: 'Costa Rica', value: 'Costa Rica' },
    { id: 41, label: 'Croatia', value: 'Croatia' },
    { id: 42, label: 'Cuba', value: 'Cuba' },
    { id: 43, label: 'Cyprus', value: 'Cyprus' },
    { id: 44, label: 'Czech Republic', value: 'Czech Republic' },
    { id: 45, label: 'Denmark', value: 'Denmark' },
    { id: 46, label: 'Djibouti', value: 'Djibouti' },
    { id: 47, label: 'Dominica', value: 'Dominica' },
    { id: 48, label: 'Dominican Republic', value: 'Dominican Republic' },
    { id: 49, label: 'East Timor', value: 'East Timor' },
    { id: 50, label: 'Ecuador', value: 'Ecuador' },
    { id: 51, label: 'Egypt', value: 'Egypt' },
    { id: 52, label: 'El Salvador', value: 'El Salvador' },
    { id: 53, label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
    { id: 54, label: 'Eritrea', value: 'Eritrea' },
    { id: 55, label: 'Estonia', value: 'EgEstoniaypt' },
    { id: 56, label: 'Ethiopia', value: 'Ethiopia' },
    { id: 57, label: 'Fiji', value: 'Fiji' },
    { id: 58, label: 'Finland', value: 'Finland' },
    { id: 59, label: 'France', value: 'France' },
    { id: 60, label: 'Gabon', value: 'Gabon' },
    { id: 61, label: 'Gambia', value: 'Gambia' },
    { id: 62, label: 'Georgia', value: 'Georgia' },
    { id: 63, label: 'Germany', value: 'Germany' },
    { id: 64, label: 'Ghana', value: 'Ghana' },
    { id: 65, label: 'Greece', value: 'Greece' },
    { id: 66, label: 'Grenada', value: 'Grenada' },
    { id: 67, label: 'Guatemala', value: 'Guatemala' },
    { id: 68, label: 'Guinea', value: 'Guinea' },
    { id: 69, label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
    { id: 70, label: 'Guyana', value: 'Guyana' },
    { id: 71, label: 'Haiti', value: 'Haiti' },
    { id: 72, label: 'Honduras', value: 'Honduras' },
    { id: 73, label: 'Hungary', value: 'Hungary' },
    { id: 74, label: 'Iceland', value: 'Iceland' },
    { id: 75, label: 'India', value: 'India' },
    { id: 76, label: 'Indonesia', value: 'Indonesia' },
    { id: 77, label: 'Iran', value: 'Iran' },
    { id: 78, label: 'Iraq', value: 'Iraq' },
    { id: 79, label: 'Ireland {Republic}', value: 'Ireland {Republic}' },
    { id: 80, label: 'Israel', value: 'Israel' },
    { id: 81, label: 'Italy', value: 'Italy' },
    { id: 82, label: 'Ivory Coast', value: 'Ivory Coast' },
    { id: 83, label: 'Jamaica', value: 'Jamaica' },
    { id: 84, label: 'Japan', value: 'Japan' },
    { id: 85, label: 'Jordan', value: 'Jordan' },
    { id: 86, label: 'Kazakhstan', value: 'Kazakhstan' },
    { id: 87, label: 'Kenya', value: 'Kenya' },
    { id: 88, label: 'Kiribati', value: 'Kiribati' },
    { id: 89, label: 'Korea North', value: 'Korea North' },
    { id: 90, label: 'Korea South', value: 'Korea South' },
    { id: 91, label: 'Kosovo', value: 'Kosovo' },
    { id: 92, label: 'Kuwait', value: 'Kuwait' },
    { id: 93, label: 'Kyrgyzstan', value: 'Kyrgyzstan' },
    { id: 94, label: 'Laos', value: 'Laos' },
    { id: 95, label: 'Latvia', value: 'Latvia' },
    { id: 96, label: 'Lebanon', value: 'Lebanon' },
    { id: 97, label: 'Lesotho', value: 'Lesotho' },
    { id: 98, label: 'Liberia', value: 'Liberia' },
    { id: 99, label: 'Libya', value: 'Libya' },
    { id: 100, label: 'Liechtenstein', value: 'Liechtenstein' },
    { id: 101, label: 'Lithuania', value: 'Lithuania' },
    { id: 102, label: 'Luxembourg', value: 'Luxembourg' },
    { id: 103, label: 'Macedonia', value: 'Macedonia' },
    { id: 104, label: 'Madagascar', value: 'Madagascar' },
    { id: 105, label: 'Malawi', value: 'Malawi' },
    { id: 106, label: 'Malaysia', value: 'Malaysia' },
    { id: 107, label: 'Maldives', value: 'Maldives' },
    { id: 108, label: 'Mali', value: 'Mali' },
    { id: 109, label: 'Malta', value: 'Malta' },
    { id: 110, label: 'Marshall Islands', value: 'Marshall Islands' },
    { id: 111, label: 'Mauritania', value: 'Mauritania' },
    { id: 112, label: 'Mauritius', value: 'Mauritius' },
    { id: 113, label: 'Mexico', value: 'Mexico' },
    { id: 114, label: 'Micronesia', value: 'Micronesia' },
    { id: 115, label: 'Moldova', value: 'Moldova' },
    { id: 116, label: 'Monaco', value: 'Monaco' },
    { id: 117, label: 'Mongolia', value: 'Mongolia' },
    { id: 118, label: 'Montenegro', value: 'Montenegro' },
    { id: 119, label: 'Morocco', value: 'Morocco' },
    { id: 120, label: 'Mozambique', value: 'Mozambique' },
    { id: 121, label: 'Myanmar, {Burma}', value: 'Myanmar, {Burma}' },
    { id: 122, label: 'Namibia', value: 'Namibia' },
    { id: 123, label: 'Nauru', value: 'Nauru' },
    { id: 124, label: 'Nepal', value: 'Nepal' },
    { id: 125, label: 'Netherlands', value: 'Netherlands' },
    { id: 126, label: 'New Zealand', value: 'New Zealand' },
    { id: 127, label: 'Nicaragua', value: 'Nicaragua' },
    { id: 128, label: 'Niger', value: 'Niger' },
    { id: 129, label: 'Nigeria', value: 'Nigeria' },
    { id: 130, label: 'Norway', value: 'Norway' },
    { id: 131, label: 'Oman', value: 'Oman' },
    { id: 132, label: 'Pakistan', value: 'Pakistan' },
    { id: 133, label: 'Palau', value: 'Palau' },
    { id: 134, label: 'Panama', value: 'Panama' },
    { id: 135, label: 'Papua New Guinea', value: 'Papua New Guinea' },
    { id: 136, label: 'Paraguay', value: 'Paraguay' },
    { id: 137, label: 'Peru', value: 'Peru' },
    { id: 138, label: 'Philippines', value: 'Philippines' },
    { id: 139, label: 'Poland', value: 'Poland' },
    { id: 140, label: 'Portugal', value: 'Portugal' },
    { id: 141, label: 'Qatar', value: 'Qatar' },
    { id: 142, label: 'Romania', value: 'Romania' },
    { id: 143, label: 'Russian Federation', value: 'Russian Federation' },
    { id: 144, label: 'Rwanda', value: 'Rwanda' },
    { id: 145, label: 'St Kitts & Nevis', value: 'St Kitts & Nevis' },
    { id: 146, label: 'St Lucia', value: 'St Lucia' },
    { id: 147, label: 'Saint Vincent & the Grenadines', value: 'Saint Vincent & the Grenadines' },
    { id: 148, label: 'Samoa', value: 'Samoa' },
    { id: 149, label: 'San Marino', value: 'San Marino' },
    { id: 150, label: 'Sao Tome & Principe', value: 'Sao Tome & Principe' },
    { id: 151, label: 'Saudi Arabia', value: 'Saudi Arabia' },
    { id: 152, label: 'Senegal', value: 'Senegal' },
    { id: 153, label: 'Serbia', value: 'Serbia' },
    { id: 154, label: 'Seychelles', value: 'Seychelles' },
    { id: 155, label: 'Sierra Leone', value: 'Sierra Leone' },
    { id: 156, label: 'Singapore', value: 'Singapore' },
    { id: 157, label: 'Slovakia', value: 'Slovakia' },
    { id: 158, label: 'Slovenia', value: 'Slovenia' },
    { id: 159, label: 'Solomon Islands', value: 'Solomon Islands' },
    { id: 160, label: 'Somalia', value: 'Somalia' },
    { id: 161, label: 'South Africa', value: 'South Africa' },
    { id: 162, label: 'South Sudan', value: 'South Sudan' },
    { id: 163, label: 'Spain', value: 'Spain' },
    { id: 164, label: 'Sri Lanka', value: 'Sri Lanka' },
    { id: 165, label: 'Sudan', value: 'Sudan' },
    { id: 166, label: 'Suriname', value: 'Suriname' },
    { id: 167, label: 'Swaziland', value: 'Swaziland' },
    { id: 168, label: 'Sweden', value: 'Sweden' },
    { id: 169, label: 'Switzerland', value: 'Switzerland' },
    { id: 170, label: 'Syria', value: 'Syria' },
    { id: 171, label: 'Taiwan', value: 'Taiwan' },
    { id: 172, label: 'Tajikistan', value: 'Tajikistan' },
    { id: 173, label: 'Tanzania', value: 'Tanzania' },
    { id: 174, label: 'Thailand', value: 'Thailand' },
    { id: 175, label: 'Togo', value: 'Togo' },
    { id: 176, label: 'Tonga', value: 'Tonga' },
    { id: 177, label: 'Trinidad & Tobago', value: 'Trinidad & Tobago' },
    { id: 178, label: 'Tunisia', value: 'Tunisia' },
    { id: 179, label: 'Turkey', value: 'Turkey' },
    { id: 180, label: 'Turkmenistan', value: 'Turkmenistan' },
    { id: 181, label: 'Tuvalu', value: 'Tuvalu' },
    { id: 182, label: 'Uganda', value: 'Uganda' },
    { id: 183, label: 'Ukraine', value: 'Ukraine' },
    { id: 184, label: 'United Arab Emirates', value: 'United Arab Emirates' },
    { id: 185, label: 'United Kingdom', value: 'United Kingdom' },
    { id: 186, label: 'United States', value: 'United States' },
    { id: 187, label: 'Uruguay', value: 'Uruguay' },
    { id: 188, label: 'Uzbekistan', value: 'Uzbekistan' },
    { id: 189, label: 'Vanuatu', value: 'Vanuatu' },
    { id: 190, label: 'Vatican City', value: 'Vatican City' },
    { id: 191, label: 'Venezuela', value: 'Venezuela' },
    { id: 192, label: 'Vietnam', value: 'Vietnam' },
    { id: 193, label: 'Yemen', value: 'Yemen' },
    { id: 194, label: 'Zambia', value: 'Zambia' },
    { id: 195, label: 'Zimbabwe', value: 'Zimbabwe' },
  ]

  if (search) {
    return response.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()))
  }

  return response
}

export const getFieldOfStudy = async (search: any): Promise<any> => {
  const response = [
    {
      id: 2,
      label: 'GENERAL AGRICULTURE',
      value: 'GENERAL AGRICULTURE',
    },
    {
      id: 3,
      label: 'AGRICULTURE PRODUCTION AND MANAGEMENT',
      value: 'AGRICULTURE PRODUCTION AND MANAGEMENT',
    },
    {
      id: 4,
      label: 'AGRICULTURAL ECONOMICS',
      value: 'AGRICULTURAL ECONOMICS',
    },
    {
      id: 5,
      label: 'ANIMAL SCIENCES',
      value: 'ANIMAL SCIENCES',
    },
    {
      id: 6,
      label: 'FOOD SCIENCE',
      value: 'FOOD SCIENCE',
    },
    {
      id: 7,
      label: 'PLANT SCIENCE AND AGRONOMY',
      value: 'PLANT SCIENCE AND AGRONOMY',
    },
    {
      id: 8,
      label: 'SOIL SCIENCE',
      value: 'SOIL SCIENCE',
    },
    {
      id: 9,
      label: 'MISCELLANEOUS AGRICULTURE',
      value: 'MISCELLANEOUS AGRICULTURE',
    },
    {
      id: 10,
      label: 'FORESTRY',
      value: 'FORESTRY',
    },
    {
      id: 11,
      label: 'NATURAL RESOURCES MANAGEMENT',
      value: 'NATURAL RESOURCES MANAGEMENT',
    },
    {
      id: 12,
      label: 'FINE ARTS',
      value: 'FINE ARTS',
    },
    {
      id: 13,
      label: 'DRAMA AND THEATER ARTS',
      value: 'DRAMA AND THEATER ARTS',
    },
    {
      id: 14,
      label: 'MUSIC',
      value: 'MUSIC',
    },
    {
      id: 15,
      label: 'VISUAL AND PERFORMING ARTS',
      value: 'VISUAL AND PERFORMING ARTS',
    },
    {
      id: 16,
      label: 'COMMERCIAL ART AND GRAPHIC DESIGN',
      value: 'COMMERCIAL ART AND GRAPHIC DESIGN',
    },
    {
      id: 17,
      label: 'FILM VIDEO AND PHOTOGRAPHIC ARTS',
      value: 'FILM VIDEO AND PHOTOGRAPHIC ARTS',
    },
    {
      id: 18,
      label: 'STUDIO ARTS',
      value: 'STUDIO ARTS',
    },
    {
      id: 19,
      label: 'MISCELLANEOUS FINE ARTS',
      value: 'MISCELLANEOUS FINE ARTS',
    },
    {
      id: 20,
      label: 'ENVIRONMENTAL SCIENCE',
      value: 'ENVIRONMENTAL SCIENCE',
    },
    {
      id: 21,
      label: 'BIOLOGY',
      value: 'BIOLOGY',
    },
    {
      id: 22,
      label: 'BIOCHEMICAL SCIENCES',
      value: 'BIOCHEMICAL SCIENCES',
    },
    {
      id: 23,
      label: 'BOTANY',
      value: 'BOTANY',
    },
    {
      id: 24,
      label: 'MOLECULAR BIOLOGY',
      value: 'MOLECULAR BIOLOGY',
    },
    {
      id: 25,
      label: 'ECOLOGY',
      value: 'ECOLOGY',
    },
    {
      id: 26,
      label: 'GENETICS',
      value: 'GENETICS',
    },
    {
      id: 27,
      label: 'MICROBIOLOGY',
      value: 'MICROBIOLOGY',
    },
    {
      id: 28,
      label: 'PHARMACOLOGY',
      value: 'PHARMACOLOGY',
    },
    {
      id: 29,
      label: 'PHYSIOLOGY',
      value: 'PHYSIOLOGY',
    },
    {
      id: 30,
      label: 'ZOOLOGY',
      value: 'ZOOLOGY',
    },
    {
      id: 31,
      label: 'NEUROSCIENCE',
      value: 'NEUROSCIENCE',
    },
    {
      id: 32,
      label: 'MISCELLANEOUS BIOLOGY',
      value: 'MISCELLANEOUS BIOLOGY',
    },
    {
      id: 33,
      label: 'COGNITIVE SCIENCE AND BIOPSYCHOLOGY',
      value: 'COGNITIVE SCIENCE AND BIOPSYCHOLOGY',
    },
    {
      id: 34,
      label: 'GENERAL BUSINESS',
      value: 'GENERAL BUSINESS',
    },
    {
      id: 35,
      label: 'ACCOUNTING',
      value: 'ACCOUNTING',
    },
    {
      id: 36,
      label: 'ACTUARIAL SCIENCE',
      value: 'ACTUARIAL SCIENCE',
    },
    {
      id: 37,
      label: 'BUSINESS MANAGEMENT AND ADMINISTRATION',
      value: 'BUSINESS MANAGEMENT AND ADMINISTRATION',
    },
    {
      id: 38,
      label: 'OPERATIONS LOGISTICS AND E-COMMERCE',
      value: 'OPERATIONS LOGISTICS AND E-COMMERCE',
    },
    {
      id: 39,
      label: 'BUSINESS ECONOMICS',
      value: 'BUSINESS ECONOMICS',
    },
    {
      id: 40,
      label: 'MARKETING AND MARKETING RESEARCH',
      value: 'MARKETING AND MARKETING RESEARCH',
    },
    {
      id: 41,
      label: 'FINANCE',
      value: 'FINANCE',
    },
    {
      id: 42,
      label: 'HUMAN RESOURCES AND PERSONNEL MANAGEMENT',
      value: 'HUMAN RESOURCES AND PERSONNEL MANAGEMENT',
    },
    {
      id: 43,
      label: 'INTERNATIONAL BUSINESS',
      value: 'INTERNATIONAL BUSINESS',
    },
    {
      id: 44,
      label: 'HOSPITALITY MANAGEMENT',
      value: 'HOSPITALITY MANAGEMENT',
    },
    {
      id: 45,
      label: 'MANAGEMENT INFORMATION SYSTEMS AND STATISTICS',
      value: 'MANAGEMENT INFORMATION SYSTEMS AND STATISTICS',
    },
    {
      id: 46,
      label: 'MISCELLANEOUS BUSINESS & MEDICAL ADMINISTRATION',
      value: 'MISCELLANEOUS BUSINESS & MEDICAL ADMINISTRATION',
    },
    {
      id: 47,
      label: 'COMMUNICATIONS',
      value: 'COMMUNICATIONS',
    },
    {
      id: 48,
      label: 'JOURNALISM',
      value: 'JOURNALISM',
    },
    {
      id: 49,
      label: 'MASS MEDIA',
      value: 'MASS MEDIA',
    },
    {
      id: 50,
      label: 'ADVERTISING AND PUBLIC RELATIONS',
      value: 'ADVERTISING AND PUBLIC RELATIONS',
    },
    {
      id: 51,
      label: 'COMMUNICATION TECHNOLOGIES',
      value: 'COMMUNICATION TECHNOLOGIES',
    },
    {
      id: 52,
      label: 'COMPUTER AND INFORMATION SYSTEMS',
      value: 'COMPUTER AND INFORMATION SYSTEMS',
    },
    {
      id: 53,
      label: 'COMPUTER PROGRAMMING AND DATA PROCESSING',
      value: 'COMPUTER PROGRAMMING AND DATA PROCESSING',
    },
    {
      id: 54,
      label: 'COMPUTER SCIENCE',
      value: 'COMPUTER SCIENCE',
    },
    {
      id: 55,
      label: 'INFORMATION SCIENCES',
      value: 'INFORMATION SCIENCES',
    },
    {
      id: 56,
      label: 'COMPUTER ADMINISTRATION MANAGEMENT AND SECURITY',
      value: 'COMPUTER ADMINISTRATION MANAGEMENT AND SECURITY',
    },
    {
      id: 57,
      label: 'COMPUTER NETWORKING AND TELECOMMUNICATIONS',
      value: 'COMPUTER NETWORKING AND TELECOMMUNICATIONS',
    },
    {
      id: 58,
      label: 'MATHEMATICS',
      value: 'MATHEMATICS',
    },
    {
      id: 59,
      label: 'APPLIED MATHEMATICS',
      value: 'APPLIED MATHEMATICS',
    },
    {
      id: 60,
      label: 'STATISTICS AND DECISION SCIENCE',
      value: 'STATISTICS AND DECISION SCIENCE',
    },
    {
      id: 61,
      label: 'MATHEMATICS AND COMPUTER SCIENCE',
      value: 'MATHEMATICS AND COMPUTER SCIENCE',
    },
    {
      id: 62,
      label: 'GENERAL EDUCATION',
      value: 'GENERAL EDUCATION',
    },
    {
      id: 63,
      label: 'EDUCATIONAL ADMINISTRATION AND SUPERVISION',
      value: 'EDUCATIONAL ADMINISTRATION AND SUPERVISION',
    },
    {
      id: 64,
      label: 'SCHOOL STUDENT COUNSELING',
      value: 'SCHOOL STUDENT COUNSELING',
    },
    {
      id: 65,
      label: 'ELEMENTARY EDUCATION',
      value: 'ELEMENTARY EDUCATION',
    },
    {
      id: 66,
      label: 'MATHEMATICS TEACHER EDUCATION',
      value: 'MATHEMATICS TEACHER EDUCATION',
    },
    {
      id: 67,
      label: 'PHYSICAL AND HEALTH EDUCATION TEACHING',
      value: 'PHYSICAL AND HEALTH EDUCATION TEACHING',
    },
    {
      id: 68,
      label: 'EARLY CHILDHOOD EDUCATION',
      value: 'EARLY CHILDHOOD EDUCATION',
    },
    {
      id: 69,
      label: 'SCIENCE AND COMPUTER TEACHER EDUCATION',
      value: 'SCIENCE AND COMPUTER TEACHER EDUCATION',
    },
    {
      id: 70,
      label: 'SECONDARY TEACHER EDUCATION',
      value: 'SECONDARY TEACHER EDUCATION',
    },
    {
      id: 71,
      label: 'SPECIAL NEEDS EDUCATION',
      value: 'SPECIAL NEEDS EDUCATION',
    },
    {
      id: 72,
      label: 'SOCIAL SCIENCE OR HISTORY TEACHER EDUCATION',
      value: 'SOCIAL SCIENCE OR HISTORY TEACHER EDUCATION',
    },
    {
      id: 73,
      label: 'TEACHER EDUCATION: MULTIPLE LEVELS',
      value: 'TEACHER EDUCATION: MULTIPLE LEVELS',
    },
    {
      id: 74,
      label: 'LANGUAGE AND DRAMA EDUCATION',
      value: 'LANGUAGE AND DRAMA EDUCATION',
    },
    {
      id: 75,
      label: 'ART AND MUSIC EDUCATION',
      value: 'ART AND MUSIC EDUCATION',
    },
    {
      id: 76,
      label: 'MISCELLANEOUS EDUCATION',
      value: 'MISCELLANEOUS EDUCATION',
    },
    {
      id: 77,
      label: 'LIBRARY SCIENCE',
      value: 'LIBRARY SCIENCE',
    },
    {
      id: 78,
      label: 'ARCHITECTURE',
      value: 'ARCHITECTURE',
    },
    {
      id: 79,
      label: 'GENERAL ENGINEERING',
      value: 'GENERAL ENGINEERING',
    },
    {
      id: 80,
      label: 'AEROSPACE ENGINEERING',
      value: 'AEROSPACE ENGINEERING',
    },
    {
      id: 81,
      label: 'BIOLOGICAL ENGINEERING',
      value: 'BIOLOGICAL ENGINEERING',
    },
    {
      id: 82,
      label: 'ARCHITECTURAL ENGINEERING',
      value: 'ARCHITECTURAL ENGINEERING',
    },
    {
      id: 83,
      label: 'BIOMEDICAL ENGINEERING',
      value: 'BIOMEDICAL ENGINEERING',
    },
    {
      id: 84,
      label: 'CHEMICAL ENGINEERING',
      value: 'CHEMICAL ENGINEERING',
    },
    {
      id: 85,
      label: 'CIVIL ENGINEERING',
      value: 'CIVIL ENGINEERING',
    },
    {
      id: 86,
      label: 'COMPUTER ENGINEERING',
      value: 'COMPUTER ENGINEERING',
    },
    {
      id: 87,
      label: 'ELECTRICAL ENGINEERING',
      value: 'ELECTRICAL ENGINEERING',
    },
    {
      id: 88,
      label: 'ENGINEERING MECHANICS PHYSICS AND SCIENCE',
      value: 'ENGINEERING MECHANICS PHYSICS AND SCIENCE',
    },
    {
      id: 89,
      label: 'ENVIRONMENTAL ENGINEERING',
      value: 'ENVIRONMENTAL ENGINEERING',
    },
    {
      id: 90,
      label: 'GEOLOGICAL AND GEOPHYSICAL ENGINEERING',
      value: 'GEOLOGICAL AND GEOPHYSICAL ENGINEERING',
    },
    {
      id: 91,
      label: 'INDUSTRIAL AND MANUFACTURING ENGINEERING',
      value: 'INDUSTRIAL AND MANUFACTURING ENGINEERING',
    },
    {
      id: 92,
      label: 'MATERIALS ENGINEERING AND MATERIALS SCIENCE',
      value: 'MATERIALS ENGINEERING AND MATERIALS SCIENCE',
    },
    {
      id: 93,
      label: 'MECHANICAL ENGINEERING',
      value: 'MECHANICAL ENGINEERING',
    },
    {
      id: 94,
      label: 'METALLURGICAL ENGINEERING',
      value: 'METALLURGICAL ENGINEERING',
    },
    {
      id: 95,
      label: 'MINING AND MINERAL ENGINEERING',
      value: 'MINING AND MINERAL ENGINEERING',
    },
    {
      id: 96,
      label: 'NAVAL ARCHITECTURE AND MARINE ENGINEERING',
      value: 'NAVAL ARCHITECTURE AND MARINE ENGINEERING',
    },
    {
      id: 97,
      label: 'NUCLEAR ENGINEERING',
      value: 'NUCLEAR ENGINEERING',
    },
    {
      id: 98,
      label: 'PETROLEUM ENGINEERING',
      value: 'PETROLEUM ENGINEERING',
    },
    {
      id: 99,
      label: 'MISCELLANEOUS ENGINEERING',
      value: 'MISCELLANEOUS ENGINEERING',
    },
    {
      id: 100,
      label: 'ENGINEERING TECHNOLOGIES',
      value: 'ENGINEERING TECHNOLOGIES',
    },
    {
      id: 101,
      label: 'ENGINEERING AND INDUSTRIAL MANAGEMENT',
      value: 'ENGINEERING AND INDUSTRIAL MANAGEMENT',
    },
    {
      id: 102,
      label: 'ELECTRICAL ENGINEERING TECHNOLOGY',
      value: 'ELECTRICAL ENGINEERING TECHNOLOGY',
    },
    {
      id: 103,
      label: 'INDUSTRIAL PRODUCTION TECHNOLOGIES',
      value: 'INDUSTRIAL PRODUCTION TECHNOLOGIES',
    },
    {
      id: 104,
      label: 'MECHANICAL ENGINEERING RELATED TECHNOLOGIES',
      value: 'MECHANICAL ENGINEERING RELATED TECHNOLOGIES',
    },
    {
      id: 105,
      label: 'MISCELLANEOUS ENGINEERING TECHNOLOGIES',
      value: 'MISCELLANEOUS ENGINEERING TECHNOLOGIES',
    },
    {
      id: 106,
      label: 'MATERIALS SCIENCE',
      value: 'MATERIALS SCIENCE',
    },
    {
      id: 107,
      label: 'NUTRITION SCIENCES',
      value: 'NUTRITION SCIENCES',
    },
    {
      id: 108,
      label: 'GENERAL MEDICAL AND HEALTH SERVICES',
      value: 'GENERAL MEDICAL AND HEALTH SERVICES',
    },
    {
      id: 109,
      label: 'COMMUNICATION DISORDERS SCIENCES AND SERVICES',
      value: 'COMMUNICATION DISORDERS SCIENCES AND SERVICES',
    },
    {
      id: 110,
      label: 'HEALTH AND MEDICAL ADMINISTRATIVE SERVICES',
      value: 'HEALTH AND MEDICAL ADMINISTRATIVE SERVICES',
    },
    {
      id: 111,
      label: 'MEDICAL ASSISTING SERVICES',
      value: 'MEDICAL ASSISTING SERVICES',
    },
    {
      id: 112,
      label: 'MEDICAL TECHNOLOGIES TECHNICIANS',
      value: 'MEDICAL TECHNOLOGIES TECHNICIANS',
    },
    {
      id: 113,
      label: 'HEALTH AND MEDICAL PREPARATORY PROGRAMS',
      value: 'HEALTH AND MEDICAL PREPARATORY PROGRAMS',
    },
    {
      id: 114,
      label: 'NURSING',
      value: 'NURSING',
    },
    {
      id: 115,
      label: 'PHARMACY PHARMACEUTICAL SCIENCES AND ADMINISTRATION',
      value: 'PHARMACY PHARMACEUTICAL SCIENCES AND ADMINISTRATION',
    },
    {
      id: 116,
      label: 'TREATMENT THERAPY PROFESSIONS',
      value: 'TREATMENT THERAPY PROFESSIONS',
    },
    {
      id: 117,
      label: 'COMMUNITY AND PUBLIC HEALTH',
      value: 'COMMUNITY AND PUBLIC HEALTH',
    },
    {
      id: 118,
      label: 'MISCELLANEOUS HEALTH MEDICAL PROFESSIONS',
      value: 'MISCELLANEOUS HEALTH MEDICAL PROFESSIONS',
    },
    {
      id: 119,
      label: 'AREA ETHNIC AND CIVILIZATION STUDIES',
      value: 'AREA ETHNIC AND CIVILIZATION STUDIES',
    },
    {
      id: 120,
      label: 'LINGUISTICS AND COMPARATIVE LANGUAGE AND LITERATURE',
      value: 'LINGUISTICS AND COMPARATIVE LANGUAGE AND LITERATURE',
    },
    {
      id: 121,
      label: 'FRENCH GERMAN LATIN AND OTHER COMMON FOREIGN LANGUAGE STUDIES',
      value: 'FRENCH GERMAN LATIN AND OTHER COMMON FOREIGN LANGUAGE STUDIES',
    },
    {
      id: 122,
      label: 'OTHER FOREIGN LANGUAGES',
      value: 'OTHER FOREIGN LANGUAGES',
    },
    {
      id: 123,
      label: 'ENGLISH LANGUAGE AND LITERATURE',
      value: 'ENGLISH LANGUAGE AND LITERATURE',
    },
    {
      id: 124,
      label: 'COMPOSITION AND RHETORIC',
      value: 'COMPOSITION AND RHETORIC',
    },
    {
      id: 125,
      label: 'LIBERAL ARTS',
      value: 'LIBERAL ARTS',
    },
    {
      id: 126,
      label: 'HUMANITIES',
      value: 'HUMANITIES',
    },
    {
      id: 127,
      label: 'INTERCULTURAL AND INTERNATIONAL STUDIES',
      value: 'INTERCULTURAL AND INTERNATIONAL STUDIES',
    },
    {
      id: 128,
      label: 'PHILOSOPHY AND RELIGIOUS STUDIES',
      value: 'PHILOSOPHY AND RELIGIOUS STUDIES',
    },
    {
      id: 129,
      label: 'THEOLOGY AND RELIGIOUS VOCATIONS',
      value: 'THEOLOGY AND RELIGIOUS VOCATIONS',
    },
    {
      id: 130,
      label: 'ANTHROPOLOGY AND ARCHEOLOGY',
      value: 'ANTHROPOLOGY AND ARCHEOLOGY',
    },
    {
      id: 131,
      label: 'ART HISTORY AND CRITICISM',
      value: 'ART HISTORY AND CRITICISM',
    },
    {
      id: 132,
      label: 'HISTORY',
      value: 'HISTORY',
    },
    {
      id: 133,
      label: 'UNITED STATES HISTORY',
      value: 'UNITED STATES HISTORY',
    },
    {
      id: 134,
      label: 'COSMETOLOGY SERVICES AND CULINARY ARTS',
      value: 'COSMETOLOGY SERVICES AND CULINARY ARTS',
    },
    {
      id: 135,
      label: 'FAMILY AND CONSUMER SCIENCES',
      value: 'FAMILY AND CONSUMER SCIENCES',
    },
    {
      id: 136,
      label: 'MILITARY TECHNOLOGIES',
      value: 'MILITARY TECHNOLOGIES',
    },
    {
      id: 137,
      label: 'PHYSICAL FITNESS PARKS RECREATION AND LEISURE',
      value: 'PHYSICAL FITNESS PARKS RECREATION AND LEISURE',
    },
    {
      id: 138,
      label: 'CONSTRUCTION SERVICES',
      value: 'CONSTRUCTION SERVICES',
    },
    {
      id: 139,
      label: 'ELECTRICAL',
      value: 'ELECTRICAL',
    },
    {
      id: 140,
      label: 'TRANSPORTATION SCIENCES AND TECHNOLOGIES',
      value: 'TRANSPORTATION SCIENCES AND TECHNOLOGIES',
    },
    {
      id: 141,
      label: 'MULTI/INTERDISCIPLINARY STUDIES',
      value: 'MULTI/INTERDISCIPLINARY STUDIES',
    },
    {
      id: 142,
      label: 'COURT REPORTING',
      value: 'COURT REPORTING',
    },
    {
      id: 143,
      label: 'PRE-LAW AND LEGAL STUDIES',
      value: 'PRE-LAW AND LEGAL STUDIES',
    },
    {
      id: 144,
      label: 'CRIMINAL JUSTICE AND FIRE PROTECTION',
      value: 'CRIMINAL JUSTICE AND FIRE PROTECTION',
    },
    {
      id: 145,
      label: 'PUBLIC ADMINISTRATION',
      value: 'PUBLIC ADMINISTRATION',
    },
    {
      id: 146,
      label: 'PUBLIC POLICY',
      value: 'PUBLIC POLICY',
    },
    {
      id: 148,
      label: 'PHYSICAL SCIENCES',
      value: 'PHYSICAL SCIENCES',
    },
    {
      id: 149,
      label: 'ASTRONOMY AND ASTROPHYSICS',
      value: 'ASTRONOMY AND ASTROPHYSICS',
    },
    {
      id: 150,
      label: 'ATMOSPHERIC SCIENCES AND METEOROLOGY',
      value: 'ATMOSPHERIC SCIENCES AND METEOROLOGY',
    },
    {
      id: 151,
      label: 'CHEMISTRY',
      value: 'CHEMISTRY',
    },
    {
      id: 152,
      label: 'GEOLOGY AND EARTH SCIENCE',
      value: 'GEOLOGY AND EARTH SCIENCE',
    },
    {
      id: 153,
      label: 'GEOSCIENCES',
      value: 'GEOSCIENCES',
    },
    {
      id: 154,
      label: 'OCEANOGRAPHY',
      value: 'OCEANOGRAPHY',
    },
    {
      id: 155,
      label: 'PHYSICS',
      value: 'PHYSICS',
    },
    {
      id: 156,
      label: 'MULTI-DISCIPLINARY OR GENERAL SCIENCE',
      value: 'MULTI-DISCIPLINARY OR GENERAL SCIENCE',
    },
    {
      id: 157,
      label: 'NUCLEAR',
      value: 'NUCLEAR',
    },
    {
      id: 158,
      label: 'PSYCHOLOGY',
      value: 'PSYCHOLOGY',
    },
    {
      id: 159,
      label: 'EDUCATIONAL PSYCHOLOGY',
      value: 'EDUCATIONAL PSYCHOLOGY',
    },
    {
      id: 160,
      label: 'CLINICAL PSYCHOLOGY',
      value: 'CLINICAL PSYCHOLOGY',
    },
    {
      id: 161,
      label: 'COUNSELING PSYCHOLOGY',
      value: 'COUNSELING PSYCHOLOGY',
    },
    {
      id: 162,
      label: 'INDUSTRIAL AND ORGANIZATIONAL PSYCHOLOGY',
      value: 'INDUSTRIAL AND ORGANIZATIONAL PSYCHOLOGY',
    },
    {
      id: 163,
      label: 'SOCIAL PSYCHOLOGY',
      value: 'SOCIAL PSYCHOLOGY',
    },
    {
      id: 164,
      label: 'MISCELLANEOUS PSYCHOLOGY',
      value: 'MISCELLANEOUS PSYCHOLOGY',
    },
    {
      id: 165,
      label: 'HUMAN SERVICES AND COMMUNITY ORGANIZATION',
      value: 'HUMAN SERVICES AND COMMUNITY ORGANIZATION',
    },
    {
      id: 166,
      label: 'SOCIAL WORK',
      value: 'SOCIAL WORK',
    },
    {
      id: 167,
      label: 'INTERDISCIPLINARY SOCIAL SCIENCES',
      value: 'INTERDISCIPLINARY SOCIAL SCIENCES',
    },
    {
      id: 168,
      label: 'GENERAL SOCIAL SCIENCES',
      value: 'GENERAL SOCIAL SCIENCES',
    },
    {
      id: 169,
      label: 'ECONOMICS',
      value: 'ECONOMICS',
    },
    {
      id: 170,
      label: 'CRIMINOLOGY',
      value: 'CRIMINOLOGY',
    },
    {
      id: 171,
      label: 'GEOGRAPHY',
      value: 'GEOGRAPHY',
    },
    {
      id: 172,
      label: 'INTERNATIONAL RELATIONS',
      value: 'INTERNATIONAL RELATIONS',
    },
    {
      id: 173,
      label: 'POLITICAL SCIENCE AND GOVERNMENT',
      value: 'POLITICAL SCIENCE AND GOVERNMENT',
    },
    {
      id: 174,
      label: 'SOCIOLOGY',
      value: 'SOCIOLOGY',
    },
    {
      id: 175,
      label: 'MISCELLANEOUS SOCIAL SCIENCES',
      value: 'MISCELLANEOUS SOCIAL SCIENCES',
    },
  ]

  if (search) {
    return response.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()))
  }

  return response
}

export const getListProvinces = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/provinces',
    data: {
      ...params,
      sort_order: 'desc',
    },
  })

  return response?.data?.data?.map(({ id, name }) => ({
    label: name,
    value: id,
    id,
    key: id,
  }))
}

export const getListCities = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/cities',
    data: {
      ...params,
      sort_order: 'desc',
    },
  })

  return response?.data?.data?.map(({ id, cities_name }) => ({
    label: cities_name,
    value: id,
    id,
    key: id,
  }))
}

export const getListDistricts = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/districts',
    data: {
      ...params,
      sort_order: 'desc',
    },
  })

  return response?.data?.data?.map(({ id, districts_name }) => ({
    label: districts_name,
    value: id,
    id,
    key: id,
  }))
}

export const postEmployeeSelfService = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/employee-self-service',
    data: params,
  })

  return response
}