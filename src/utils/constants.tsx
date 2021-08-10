import { sha256 } from 'js-sha256'
import i18n from '../i18n'

const DATABASE_NAME = '@notify-me-solinca'

// @app:collection
export const COLLECTION_USER_AUTH = `${DATABASE_NAME}:user-auth`
export const COLLECTION_APPOINTMENTS = `${DATABASE_NAME}:appointments`
export const COLLECTION_LOCALE = `${DATABASE_NAME}:locale`
export const COLLECTION_THEME = `${DATABASE_NAME}:theme`
export const COLLECTION_NOTIFICATIONS = `${DATABASE_NAME}:notifications`

export type DROPDOWN_OPTION = {
  label: string
  value: string
}

export const getLocales = (): DROPDOWN_OPTION[] => [
  {
    label: i18n.t('userProfile.portuguese'),
    value: 'pt-PT',
  },
  {
    label: i18n.t('userProfile.english'),
    value: 'en-UK',
  },
]

export const getThemes = (): DROPDOWN_OPTION[] => [
  {
    label: i18n.t('userProfile.dark'),
    value: 'dark',
  },
  {
    label: i18n.t('userProfile.light'),
    value: 'light',
  },
]

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

export const encryptPassword = (password: string): string =>
  sha256.create().update(password).hex()

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const CLASSES = [
  'BODY PUMP',
  'BODY ATTACK',
  'BODY COMBAT',
  'BODY BALANCE',
  'HIDROGINASTICA',
  'PILATES',
  'S-CHALLENGE',
  'RPM',
  'POWER JUMP',
  'YOGA',
  'LOCALIZADA',
  '3B',
  'GAP',
  'BARRA DE CHÃO',
  'ZUMBA',
]

export enum CLASS_TYPES {
  INDOORS = 'indoors',
  OPEN_AIR = 'open air',
}

export type ClassType = `${CLASS_TYPES}`

export type ClassesData = {
  title: string
  data: ClassInfo[]
}

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

export type ClassNotificationInfo = {
  club: string
  classesDetails: string[]
}

export type NotificationType = {
  id: string
  date: number // in ms
  title: string
  body: string
  data: { classes: ClassNotificationInfo[] }
}
