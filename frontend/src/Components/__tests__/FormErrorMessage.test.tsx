import { screen } from '@testing-library/react'

import { render } from '../../testUtil'

import { FormErrorMessage, FormErrorMessageProps } from '../FormErrorMessage'

describe('FormErrorMessage', () => {
  const setUp = (props: Partial<FormErrorMessageProps> = {}) =>
    render(<FormErrorMessage {...props} />)

  it('should show error message with field', async () => {
    setUp({ error: { field: 'email', errorMessage: 'erroring' } })

    await screen.findByText('email: erroring')
  })

  it('should show error message without field', async () => {
    setUp({ error: { errorMessage: 'erroring' } })

    await screen.findByText('erroring')
  })

  it('should not show error message', async () => {
    const { container } = setUp({ error: undefined })

    expect(container).toBeEmptyDOMElement()
  })
})
