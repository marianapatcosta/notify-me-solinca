import React from 'react'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { useLocale } from '../../hooks/useLocale'
import { StyledRegularText } from '../../themes/global-styles'

export const DropDown = ({
  multiple = false,
  disabled = false,
  placeholder,
  multipleText,
  schema,
  open,
  value,
  items,
  zIndex,
  zIndexInverse,
  setOpen,
  setValue,
  onChangeValue,
  onClose,
  ...otherProps
}: DropDownPickerProps) => {
  const theme = useTheme()
  const { t } = useLocale()
  const { highlight50, primary, secondary, font } = theme.colors

  const commonDropdownProps = {
    onClose: onClose,
    textStyle: {
      fontSize: 15,
      fontFamily: theme.fonts.body,
      color: theme.colors.font,
    },
    ArrowDownIconComponent: () => (
      <Feather name='chevron-down' color={font} size={18} />
    ),
    ArrowUpIconComponent: () => (
      <Feather name='chevron-up' color={font} size={18} />
    ),
    TickIconComponent: () => (
      <Feather name='check' color={highlight50} size={18} />
    ),
    style: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: highlight50,
      backgroundColor: primary,
      opacity: disabled ? 0.5 : 1,
    },
    selectedItemContainerStyle: {
      backgroundColor: secondary,
    },
    selectedItemLabelStyle: {
      color: highlight50,
      textTransform: 'capitalize',
    },
    listItemLabelStyle: {
      color: font,
      textTransform: 'capitalize',
    },
    dropDownContainerStyle: {
      borderColor: highlight50,
      backgroundColor: primary,
    },
    placeholderStyle: {
      color: font,
      fontFamily: theme.fonts.body,
      fontSize: 16,
    },
  }

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      disabled={disabled}
      multiple={multiple}
      multipleText={multipleText}
      placeholder={placeholder}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={onChangeValue}
      zIndex={zIndex}
      zIndexInverse={zIndexInverse}
      schema={schema}
      listMode='SCROLLVIEW'
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      ListEmptyComponent={() => (
        <StyledRegularText style={{ textAlign: 'center', fontSize: 16 }}>
          {t('global.noItems')}
        </StyledRegularText>
      )}
      {...commonDropdownProps}
      {...otherProps}
    />
  )
}
