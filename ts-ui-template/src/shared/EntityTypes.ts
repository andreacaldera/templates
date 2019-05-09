export type Address = {
  addressId?: number
  lines: ReadonlyArray<string | undefined | null>
  postcode?: string | null
  city?: string | null
  county?: string | null
  countryId: number
  country: string
  deleted?: boolean
}

export type Note = {
  id?: number
  notes: string
  deleted?: boolean
}

export type PersonAlias = {
  aliasId?: number
  title?: string | null
  titleId?: number | null
  titleAlternative?: string | null
  firstName?: string | null
  middleName?: string | null
  lastName?: string | null
  deleted?: boolean
}

export type SimpleDate = {
  day?: number | null
  month?: number | null
  year?: number | null
}

type BasePerson = {
  referenceNumber: string
  firstName: string
  middleName: string
  lastName: string
}

export type PersonLink = BasePerson & {
  linkId?: number
  association: string
}

export type Person = BasePerson & {
  title?: string
  titleId?: number
  titleAlternative?: string
  gender?: 'Male' | 'Female' | null
  phone: string
  fax: string
  mobile: string
  email: string
  imageFile?: string | null
  imageId?: number | null
  nationalityId?: number
  nationality?: string
  dateOfBirth?: SimpleDate
  dateOfDeath?: SimpleDate
  isDead: boolean
  aliases: PersonAlias[]
  addresses: Address[]
  notes: Note[]
  personLinks: PersonLink[]
}
