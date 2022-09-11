import { validationResult } from 'express-validator'

export const validateSchema = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []

  errors.array().map(({ param, msg }) => extractedErrors.push({ [param]: msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}
