import styled from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledNoData = styled(StyledRegularText)`
  font-style: italic;
`

export const StyledSectionTitle = styled(StyledRegularText)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.highlight50};
  margin: 8px 0;
`

export const StyledSection = styled.SectionList`
  margin: 8px 0;
`
