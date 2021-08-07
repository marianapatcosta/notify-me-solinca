import React, { ReactNode } from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import { Input } from '../Input'

type ControlledInputProps = ControllerProps & {
  icon?: ReactNode
  error?: string
  placeholder?: string
  secureTextEntry: boolean
}

export const ControlledInput = ({
  control,
  rules,
  placeholder,
  name,
  defaultValue = '',
  error,
  icon,
  secureTextEntry,
  ...otherProps
}: ControlledInputProps) => {
  return (
    <Controller
      {...otherProps}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          error={error}
          secureTextEntry={secureTextEntry}
          icon={icon}
        />
      )}
      name={name}
      defaultValue={defaultValue}
    />
  )
}
