import React, { useState, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import { useTheme } from 'styled-components'
import { useLocale } from '../../hooks/useLocale'
import {
  ClassesData,
  ClassInfo,
  ClassType,
  CLASS_TYPES,
} from '../../utils/constants'
import { ClassInfoItem } from '../ClassInfoItem'
import { StyledSection, StyledSectionTitle, StyledNoData } from './styles'

type ClassesListProps = {
  selectedClassType: ClassType
  availableClasses: ClassesData[]
  openAirAvailableClasses: ClassesData[]
  onRefresh: () => void
}

export const ClassesList = ({
  availableClasses,
  openAirAvailableClasses,
  selectedClassType,
  onRefresh,
}: ClassesListProps) => {
  const theme = useTheme()
  const { t } = useLocale()
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const { title, highlight50 } = theme.colors

  const areThereClassesAvailable = (classes: ClassInfo[]) =>
    !classes.every(({ today, tomorrow }) => !today.length && !tomorrow.length)

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await onRefresh()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const renderNoData = ({ section }: { section: ClassesData }) => {
    if (!areThereClassesAvailable(section.data)) {
      return <StyledNoData>{t('home.noClassesAvailable')}</StyledNoData>
    }
  }

  const isOpenAir = selectedClassType === CLASS_TYPES.OPEN_AIR

  return (
    <StyledSection
      sections={isOpenAir ? openAirAvailableClasses : availableClasses}
      keyExtractor={(item) =>
        `available-classes-${selectedClassType}-${item.club}`
      }
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          colors={[highlight50]}
          progressBackgroundColor={title}
          tintColor={highlight50}
        />
      }
      renderItem={({ item }) => <ClassInfoItem classInfo={item as ClassInfo} />}
      renderSectionFooter={renderNoData}
      renderSectionHeader={({ section: { title } }) => (
        <StyledSectionTitle>{title}</StyledSectionTitle>
      )}
    />
  )
}
