import { Field, FieldAttributes } from 'formik'
import { InputHTMLAttributes, FC } from 'react'
import styled from 'styled-components'

const TextboxContainer = styled.div`
  text-align: left;
  min-height: 88px;
  display: flex;
  flex-flow: column;
  flex: 1;
`

const Textfield = styled.input.attrs<{ isErroring: boolean }>((props) => ({
  isErroring: props.isErroring || false,
}))<{ isErroring: boolean }>`
  margin-top: 4px;
  padding: 12px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;

  ${(props) =>
    props.isErroring &&
    `
    border: 0;
    outline-color: ${props.theme.error};
    outline-style: solid;
    outline-width: 1px;`}}
`

const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.error};
  margin: 8px 0;
`

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement> & FieldAttributes<any>,
  'id'
>

export type TextBoxProps = {
  name: string
  label: string
  inputProps?: InputProps
}

export const Textbox: FC<TextBoxProps> = ({ label, name, inputProps }) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldAttributes<any>) => {
        const isErroring = meta.touched && meta.error

        return (
          <TextboxContainer>
            <label htmlFor={name}>{label}</label>

            <Textfield
              type="text"
              id={name}
              isErroring={isErroring}
              {...inputProps}
              {...field}
            />
            {isErroring && <ErrorMessage>{meta.error}</ErrorMessage>}
          </TextboxContainer>
        )
      }}
    </Field>
  )
}
