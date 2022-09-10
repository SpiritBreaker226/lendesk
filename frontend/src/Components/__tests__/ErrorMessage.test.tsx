import { screen } from '@testing-library/react'

import { render } from '../../testUtil'

import { ErrorMessage, ErrorMessageProps } from '../ErrorMessage'

describe('ErrorMessage', () => {
  const setUp = (props: Partial<ErrorMessageProps> = {}) =>
    render(<ErrorMessage {...props} />)

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

  describe('when error message is a string', () => {
    it('should display', async () => {
      setUp({ error: 'erroring' })

      await screen.findByText('erroring')
    })
  })
})
