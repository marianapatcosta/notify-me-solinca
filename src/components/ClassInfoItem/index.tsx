import React from 'react'
import { View } from 'react-native'
import { useLocale } from '../../hooks/useLocale'
import {
  StyledContainer,
  StyledClub,
  StyledTitle,
  StyledSubtitle,
  StyledNoData,
  StyledClass,
  StyledDivider,
} from './styles'

export type Class = {
  capacity: number
  date: string
  description: string
  end: string
  end_date: string
  id: string
  prof: string
  project_code: string
  project_id: string
  start: string
  start_date: string
  status: string
  taken: number
}

export type ClassInfo = {
  club: string
  today: Class[]
  tomorrow: Class[]
}

type ClassInfoItemProps = {
  classInfo: ClassInfo
}

export const ClassInfoItem = ({
  classInfo: { club, today, tomorrow },
}: ClassInfoItemProps) => {
  const { t } = useLocale()

  const uniformizeDescription = (description: string) => {
    let descriptionArray = description.split(/ -(.+)/)
    descriptionArray = descriptionArray[1]
      ? descriptionArray[1].split(' ')
      : descriptionArray[0].split(' ')

    return descriptionArray
      .map((word: string) => {
        if (word.match('^[0-9]+[a-zA-Z]$'))
          return `${word.slice(0, 2)}${word.slice(2).toLowerCase()}`
        if (word.match('[a-zA-Z]'))
          return `${word.charAt(0)}${word.slice(1).toLowerCase()}`
        return word
      })
      .join(' ')
      .trim()
  }

  return !!today.length || !!tomorrow.length ? (
    <StyledContainer >
      <StyledTitle>{club}</StyledTitle>
      <View>
        <StyledClub>
          <StyledSubtitle>{t('home.today')}</StyledSubtitle>
          {!today.length ? (
            <StyledNoData>
              {t('home.noClassesAvailable', {
                day: t('home.today').toLowerCase(),
              })}
            </StyledNoData>
          ) : (
            today.map((info) => (
              <StyledClass key={`class-${info.id}`}>
                {uniformizeDescription(info.description)}
              </StyledClass>
            ))
          )}
        </StyledClub>
        <StyledClub>
          <StyledSubtitle>{t('home.tomorrow')}</StyledSubtitle>
          {!tomorrow.length ? (
            <StyledNoData>
              {t('home.noClassesAvailable', {
                day: t('home.tomorrow').toLowerCase(),
              })}
            </StyledNoData>
          ) : (
            tomorrow.map((info) => (
              <StyledClass key={`class-${info.id}`}>
                {uniformizeDescription(info.description)}
              </StyledClass>
            ))
          )}
        </StyledClub>
      </View>
      <StyledDivider />
    </StyledContainer>
  ) : null
}
