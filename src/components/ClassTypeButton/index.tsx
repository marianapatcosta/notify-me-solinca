import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components'
import { SvgProps } from 'react-native-svg'
import { StyledContainer, StyledClassesType } from './styles'

type ClassTypeButtonProps = TouchableOpacityProps & {
  icon: React.FC<SvgProps>
  isSelected: boolean
}

export const ClassTypeButton = ({
  icon: Icon,
  isSelected,
  onPress,
}: ClassTypeButtonProps) => {
  const theme = useTheme()
  const { highlight50, highlight90 } = theme.colors
  return (
    <StyledContainer onPress={onPress}>
      <StyledClassesType
        colors={[highlight90, highlight50]}
        isSelected={isSelected}
      >
        <Icon width={80} height={57} />
      </StyledClassesType>
    </StyledContainer>
  )
}
