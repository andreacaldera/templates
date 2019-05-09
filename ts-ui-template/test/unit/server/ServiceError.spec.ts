import Ajv from 'ajv'
import { ValidationError } from '../../../src/shared/ServiceError'

describe('ServiceError', () => {
  describe('ValidationError', () => {
    function validate(schema: {}, entity: any) {
      const ajv = new Ajv({ allErrors: true })
      ajv.validate(schema, entity)
      return ajv.errors
    }

    it('creates expected error for required fields', () => {
      const TEST_SCHEMA = {
        properties: {
          firstName: {
            type: ['null', 'string'],
          },
        },
        required: ['firstName'],
      }
      const errors = validate(TEST_SCHEMA, {})
      const message = 'Invalid fields'
      expect(ValidationError.fromErrorObjects(message, errors!)).toEqual(
        new ValidationError(message, [{ name: 'firstName' }]),
      )
    })

    it('creates expected error for fields other than required', () => {
      const TEST_SCHEMA = {
        properties: {
          firstName: {
            type: 'string',
          },
        },
      }
      const errors = validate(TEST_SCHEMA, { firstName: null })
      const message = 'Invalid fields'
      expect(ValidationError.fromErrorObjects(message, errors!)).toEqual(
        new ValidationError('Invalid fields', [{ name: 'firstName' }]),
      )
    })

    it('creates expected error for nested required fields', () => {
      const TEST_SCHEMA = {
        properties: {
          dateOfBirth: {
            properties: {
              day: {
                type: ['null', 'number'],
              },
              month: {
                type: ['null', 'number'],
              },
              year: {
                type: ['number'],
              },
            },
            required: ['year'],
            type: 'object',
          },
        },
      }
      const errors = validate(TEST_SCHEMA, { dateOfBirth: {} })
      const message = 'Invalid fields'
      expect(ValidationError.fromErrorObjects(message, errors!)).toEqual(
        new ValidationError('Invalid fields', [{ name: 'dateOfBirth.year' }]),
      )
    })
  })
})
