import {
  ICFilterEqual,
  ICFilterGreater,
  ICFilterGreaterEqual,
  ICFilterLess,
  ICFilterLessEqual,
  ICFilterNotEqual,
  ICFilterSelect,
} from 'src/assets'
import { CommonSelectValue } from './commonTypes'

export type OptionType = 'EQ' | 'BT' | 'CP' | 'LE' | 'GE' | 'NE' | 'NB' | 'NP' | 'GT' | 'LT'

export type DataTypes = 'S' | 'N' | 'D' | 'T'

export interface FilterOption {
  field: string
  label: string
  option: OptionType
  dataType: DataTypes
  fromValue?: CommonSelectValue
  toValue?: CommonSelectValue
  searchApi?: (search: string) => Promise<any>
  isDate?: boolean
}

export interface FilterTypesInterface {
  code: OptionType
  label: string
  icon: React.ReactNode
}
export const FILTER_TYPES = {
  EQ: { code: 'EQ', label: 'Equal', icon: <ICFilterEqual /> }, // Equal
  BT: { code: 'BT', label: 'Between', icon: <ICFilterSelect /> }, // Between
  CP: { code: 'CP', label: 'Contain Pattern', icon: <ICFilterSelect /> }, // Contains pattern
  LE: { code: 'LE', label: 'Less Than', icon: <ICFilterLessEqual /> }, // Less equal
  GE: { code: 'GE', label: 'Greater Than', icon: <ICFilterGreaterEqual /> }, // Greater than
  NE: { code: 'NE', label: 'Not Equal To', icon: <ICFilterNotEqual /> }, // Not Equal To
  NB: { code: 'NB', label: 'Not Between', icon: <ICFilterSelect /> }, // Not Between
  NP: { code: 'NP', label: 'Contains No Pattern', icon: <ICFilterSelect /> }, // Contains No Pattern
  GT: { code: 'GT', label: 'Greater Than', icon: <ICFilterGreater /> }, // Greater than
  LT: { code: 'LT', label: 'Less Than', icon: <ICFilterLess /> }, // Less then
}