export interface BaseInputProps {
  disabled?: boolean
  error?: string
  placeholder?: string
  initialValue?: string
  value?: string
  onChange?: (value: string) => void
}
