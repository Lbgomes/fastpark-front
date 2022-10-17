import { FormGroupInput } from './styles'

export default function FormGroup({ children, ...props }) {
  return <FormGroupInput {...props}>{children}</FormGroupInput>
}
