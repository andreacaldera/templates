import { Media } from '../../shared/modules/state'

const SAMPLE_RESPONSE: any = {
  success: true,
  username: 'eaorak',
  pk: '32580114',
  profile_picture:
    'https://scontent-ort2-2.cdninstagram.com/vp/bce1f4a441e4d58a5323c073a7645e97/5CB97323/t51.2885-19/s150x150/14063602_542648429279669_1419148342_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
  is_private: false,
  total_posts: 147,
  has_media: true,
  has_next_page: true,
  max_id:
    'QVFBN2EwR1QzTHdVUVpIOGg1QVRVaHVaQ294UmVHX0pKZXh2RHBwSUV0T09WNU1Qa1dpTW1RRVFaTUtVWTBac0NxYWhFTVF5NkJGaENVenRndkxsY2J5Tg==',
  media: [
    {
      code: 'BmPY0jwlTWV',
      thumbnail: 'https://www.instagram.com/p/BmPY0jwlTWV/media?size=t',
      is_video: false,
      likes: 25,
      uploaded_at: '2018-08-09 01:54:43',
    },
    {
      code: 'BmMUDZdlK4K',
      thumbnail: 'https://www.instagram.com/p/BmMUDZdlK4K/media?size=t',
      is_video: false,
      likes: 25,
      uploaded_at: '2018-08-07 21:15:20',
    },
    {
      code: 'BmLYuMVFxKY',
      thumbnail: 'https://www.instagram.com/p/BmLYuMVFxKY/media?size=t',
      is_video: false,
      likes: 16,
      uploaded_at: '2018-08-07 12:36:53',
    },
    {
      code: 'BjA6IjdFN1G',
      thumbnail: 'https://www.instagram.com/p/BjA6IjdFN1G/media?size=t',
      is_video: false,
      likes: 40,
      uploaded_at: '2018-05-20 21:23:01',
    },
    {
      code: 'Bi7TTJOlsEU',
      thumbnail: 'https://www.instagram.com/p/Bi7TTJOlsEU/media?size=t',
      is_video: false,
      likes: 15,
      uploaded_at: '2018-05-18 17:07:29',
    },
    {
      code: 'BfvidsFD795',
      thumbnail: 'https://www.instagram.com/p/BfvidsFD795/media?size=t',
      is_video: false,
      likes: 37,
      uploaded_at: '2018-02-28 13:54:55',
    },
    {
      code: 'BfQ1eEpjW4p',
      thumbnail: 'https://www.instagram.com/p/BfQ1eEpjW4p/media?size=t',
      is_video: false,
      likes: 17,
      uploaded_at: '2018-02-16 15:44:32',
    },
    {
      code: 'BfE1eHhDCHL',
      thumbnail: 'https://www.instagram.com/p/BfE1eHhDCHL/media?size=t',
      is_video: true,
      likes: 13,
      uploaded_at: '2018-02-11 23:54:02',
    },
    {
      code: 'BfE1HL7Dlei',
      thumbnail: 'https://www.instagram.com/p/BfE1HL7Dlei/media?size=t',
      is_video: false,
      likes: 24,
      uploaded_at: '2018-02-11 23:50:32',
    },
    {
      code: 'Be6UH0ZjEzI',
      thumbnail: 'https://www.instagram.com/p/Be6UH0ZjEzI/media?size=t',
      is_video: true,
      likes: 17,
      uploaded_at: '2018-02-07 21:52:08',
    },
    {
      code: 'BdNnLz0j5Ox',
      thumbnail: 'https://www.instagram.com/p/BdNnLz0j5Ox/media?size=t',
      is_video: false,
      likes: 15,
      uploaded_at: '2017-12-27 16:39:12',
    },
    {
      code: 'Bc3BptyDO-w',
      thumbnail: 'https://www.instagram.com/p/Bc3BptyDO-w/media?size=t',
      is_video: false,
      likes: 38,
      uploaded_at: '2017-12-18 22:07:57',
    },
  ],
}

export const API_RESPONSE = {
  ...SAMPLE_RESPONSE,
  media: SAMPLE_RESPONSE.media.map((m: Media) => ({
    ...m,
    imgMedium: m.thumbnail.replace('media?size=t', 'media?size=m'),
    imgLarge: m.thumbnail.replace('media?size=t', 'media?size=l'),
  })),
}

export const API_RESPONSE_DEV = {
  ...SAMPLE_RESPONSE,
  media: SAMPLE_RESPONSE.media.map((m: Media) => ({
    ...m,
    thumbnail: 'http://localhost:8080/public/sample_m.jpg',
    imgMedium: 'http://localhost:8080/public/sample_m.jpg',
    imgLarge: 'http://localhost:8080/public/sample_l.jpg',
  })),
}
