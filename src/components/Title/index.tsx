import React from 'react'
import { Text } from 'pink-lava-ui'
import useTitlePage from 'src/hooks/useTitlePage'
import { TitleProps } from './types'

export default function Title(props: TitleProps) {
  const { type } = props
  const titlePage = useTitlePage(type)

  return <Text variant="h4">{titlePage}</Text>
}
