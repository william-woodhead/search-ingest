export const mappings = {
  listingContext: {
    properties: {
      slug: {
        type: 'string',
        index : 'not_analyzed'
      },
      medias: {
        properties: {
          aspect_ratio: {
            type: 'long',
            index: 'no'
          },
          base64: {
            type: 'string',
            index: 'no'
          },
          front_image: {
            type: 'boolean',
            index: 'no'
          },
          height: {
            type: 'long',
            index: 'no'
          },
          link: {
            type: 'string',
            index: 'no'
          },
          media_type: {
            type: 'string',
            index: 'no'
          },
          mime_type: {
            type: 'string',
            index: 'no'
          },
          order: {
            type: 'long',
            index: 'no'
          },
          width: {
            type: 'long',
            index: 'no'
          }
        }
      }
    }
  }
}
