const color = ['#2771C7', '#01A862', '#ED1C24']
const renderText = (text: any) => <p style={{ fontWeight: '700', whiteSpace: 'nowrap' }}>{text}</p>
export const columnsShirt = [
  {
    title: 'SIZE',
    dataIndex: 'size',
    key: 'size',
    render: (text: any, item: any) => <p style={{ fontWeight: 'bold', color: color[item?.key] }}>{text}</p>,
  },
  {
    title: 'XXS',
    dataIndex: 'xxs',
    key: 'xxs',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: 'XS',
    dataIndex: 'xs',
    key: 'xs',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: 'S',
    dataIndex: 's',
    key: 's',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: 'M',
    dataIndex: 'm',
    key: 'm',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: 'L',
    dataIndex: 'l',
    key: 'l',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: 'XL',
    dataIndex: 'xl',
    key: 'xl',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '3XL',
    dataIndex: 'xxxl',
    key: 'xxxl',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '4XL',
    dataIndex: 'xxxxl',
    key: 'xxxxl',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '5XL',
    dataIndex: 'xxxxxl',
    key: 'xxxxxl',
    align: 'center',
    render: (text: any) => renderText(text),
  },
];

export const dataShirt = [
  {
    key: 0,
    size: 'CHEST',
    xxs: '0 CM',
    xs: '0 CM',
    s: '0 CM',
    m: '0 CM',
    l: '0 CM',
    xl: '0 CM',
    xxxl: '0 CM',
    xxxxl: '0 CM',
    xxxxxl: '0 CM',
  },
  {
    key: 1,
    size: 'SHOULDER',
    xxs: '0 CM',
    xs: '0 CM',
    s: '0 CM',
    m: '0 CM',
    l: '0 CM',
    xl: '0 CM',
    xxxl: '0 CM',
    xxxxl: '0 CM',
    xxxxxl: '0 CM',
  },
  {
    key: 2,
    size: 'ARM',
    xxs: '0 CM',
    xs: '0 CM',
    s: '0 CM',
    m: '0 CM',
    l: '0 CM',
    xl: '0 CM',
    xxxl: '0 CM',
    xxxxl: '0 CM',
    xxxxxl: '0 CM',
  },
];

export const columnsPants = [
  {
    title: 'SIZE',
    dataIndex: 'size',
    key: 'size',
    render: (text: any, item: any) => <p style={{ fontWeight: 'bold', color: color[item?.key] }}>{text}</p>,
  },
  {
    title: 'XXS',
    dataIndex: 'xxs',
    key: 'xxs',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: 'XS',
    dataIndex: 'xs',
    key: 'xs',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: 'S',
    dataIndex: 's',
    key: 's',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: 'M',
    dataIndex: 'm',
    key: 'm',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: 'L',
    dataIndex: 'l',
    key: 'l',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: 'XL',
    dataIndex: 'xl',
    key: 'xl',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '3XL',
    dataIndex: 'xxxl',
    key: 'xxxl',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '4XL',
    dataIndex: 'xxxxl',
    key: 'xxxxl',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '5XL',
    dataIndex: 'xxxxxl',
    key: 'xxxxxl',
    align: 'center',
    render: (text: any) => renderText(text),
  },
];

export const dataPants = [
  {
    key: 0,
    size: 'WAIST',
    xxs: '0 CM',
    xs: '0 CM',
    s: '0 CM',
    m: '0 CM',
    l: '0 CM',
    xl: '0 CM',
    xxxl: '0 CM',
    xxxxl: '0 CM',
    xxxxxl: '0 CM',
  },
  {
    key: 1,
    size: 'THIGH',
    xxs: '0 CM',
    xs: '0 CM',
    s: '0 CM',
    m: '0 CM',
    l: '0 CM',
    xl: '0 CM',
    xxxl: '0 CM',
    xxxxl: '0 CM',
    xxxxxl: '0 CM',
  },
  {
    key: 2,
    size: 'LONG',
    xxs: '0 CM',
    xs: '0 CM',
    s: '0 CM',
    m: '0 CM',
    l: '0 CM',
    xl: '0 CM',
    xxxl: '0 CM',
    xxxxl: '0 CM',
    xxxxxl: '0 CM',
  },
];

export const columnsShoes = [
  {
    title: 'SIZE',
    dataIndex: 'size',
    key: 'size',
    render: (text: any, item: any) => <p style={{ fontWeight: 'bold', color: color[item?.key] }}>{text}</p>,
  },
  {
    title: '32-34',
    dataIndex: 'size1',
    key: 'size1',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '35-38',
    dataIndex: 'size2',
    key: 'size2',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '39-40',
    dataIndex: 'size3',
    key: 'size3',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '41-42',
    dataIndex: 'size4',
    key: 'size4',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '43-44',
    dataIndex: 'size5',
    key: 'size5',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '45-46',
    dataIndex: 'size6',
    key: 'size6',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '47',
    dataIndex: 'size7',
    key: 'size7',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '48',
    dataIndex: 'size8',
    key: 'size8',
    align: 'center',
    render: (text: any) => renderText(text),
  },
  {
    title: '49-50',
    dataIndex: 'size9',
    key: 'size9',
    align: 'center',
    render: (text: any) => renderText(text),
  },
];

export const dataShoes = [
  {
    key: 0,
    size: 'INSOLE',
    size1: '0 CM',
    size2: '0 CM',
    size3: '0 CM',
    size4: '0 CM',
    size5: '0 CM',
    size6: '0 CM',
    size7: '0 CM',
    size8: '0 CM',
    size9: '0 CM',
  },
];