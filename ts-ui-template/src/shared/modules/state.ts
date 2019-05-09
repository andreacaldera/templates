export type FieldValue<T> = { field: string; value: T }

export type Config = Readonly<{
  baseUrl: string
  baseApiUrl: string
  imageBaseUrl: string
  diagnosticsUrl: string
  logoutUrl: string
  csrfToken: string
  user: {
    name: string
  }
  mongodb: {
    hosts: string
    database: string
    ssl: boolean
    itemsCollection: string
  }
  isDev?: boolean
}>

export type Media = {
  code: string
  thumbnail: string
  imgMedium: string
  imgLarge: string
  is_video: false
  likes: number
  uploaded_at: string
}

export type Post = {
  imageUrl: string
  description: string
  title: string
  likes?: number
  views?: number
  video: boolean
}

export type Instagram = {
  handle: string
  isPrivate: boolean
  profileImage: string
  profileDescription: string
  profileTitle: string
  numberOfPosts: number
  posts: Post[]
  // success: boolean
  // username: string
  // pk: string
  // profile_picture: string
  // is_private: boolean
  // total_posts: number
  // has_media: boolean
  // has_next_page: boolean
  // max_id: string
  // media: Media[]
}

export interface Card {
  id: string
  object: string
  address_city: string | null
  address_country: string | null
  address_line1: string | null
  address_line1_check: string | null
  address_line2: string | null
  address_state: string | null
  address_zip: string | null
  address_zip_check: string | null
  brand: string
  country: string
  cvc_check: string
  dynamic_last4: string | null
  exp_month: number
  exp_year: number
  funding: string
  last4: string
  metadata: {}
  name: string
  tokenization_method: string | null
}

export type Token = {
  id: string
  object: string
  card: Card
  client_ip: string
  created: number
  email: string
  livemode: boolean
  type: string
  used: boolean
  amount: number
  address?: Address
}

export type Address = {
  billing_address_city: string
  billing_address_country: string
  billing_address_country_code: string
  billing_address_line1: string
  billing_address_zip: string
  billing_name: string
  shipping_address_city?: string
  shipping_address_country?: string
  shipping_address_country_code?: string
  shipping_address_line1?: string
  shipping_address_zip?: string
  shipping_name?: string
}

export const emptyPost: Post = {
  description: '',
  title: '',
  imageUrl: '',
  video: false,
  likes: 0,
  views: 0,
}

export type MetaState = Readonly<{
  config: Config
  isLoading: boolean
  privacyAccepted: boolean
  sellerDemo: boolean
}>

export type PersonImage = Readonly<{
  imageFile: string | null
  imageId: number | null
}>

export type AlertState = Readonly<{
  message: string
  type: 'success' | 'danger' | 'warning'
  focus: boolean
  dismissible: boolean
}>

export type ApplicationError = {
  title: string
  message: string
}

export type State = Readonly<{
  meta: MetaState
  alert: AlertState | null
  error: ApplicationError | null
  instagram: Instagram | null
}>

export const INITIAL_INSTAGRAM: Instagram = {
  handle: '',
  isPrivate: false,
  profileImage: '',
  profileDescription: '',
  numberOfPosts: 0,
  profileTitle: '',
  posts: [],
}
