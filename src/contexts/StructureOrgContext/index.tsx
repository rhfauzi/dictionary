import { useState, createContext, Dispatch, SetStateAction } from 'react'

type StructureOrgContextValueProps = {
  isEditStructure: boolean
  setEditStructure: Dispatch<SetStateAction<boolean>>
}

type StructureOrgContextProviderProps = {
  children: React.ReactElement
}

export const StructureOrgContext = createContext<StructureOrgContextValueProps>({
  isEditStructure: false,
  setEditStructure: () => false,
})

export default function StructureOrgContextProvider(props: StructureOrgContextProviderProps) {
  const [isEditStructure, setEditStructure] = useState<boolean>(false)

  return (
    <StructureOrgContext.Provider value={{ setEditStructure, isEditStructure }}>
      {props.children}
    </StructureOrgContext.Provider>
  )
}
