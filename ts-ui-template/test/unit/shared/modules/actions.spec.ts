import { changeUrl, urlChanged } from '../../../../src/shared/modules/actions'

describe('Actions', () => {
  it('has change URL actions', () => {
    const url = 'test'
    expect(changeUrl(url)).toEqual({
      type: 'CHANGE_URL',
      payload: url
    })
  })

  it('has URL changed action', () => {
    expect(urlChanged()).toEqual({ type: 'URL_CHANGED' })
  })
})
