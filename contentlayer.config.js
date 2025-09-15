import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Update = defineDocumentType(() => ({
  name: 'Update',
  filePathPattern: `*.md`,
  // contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    thumbnailImage: { type: 'string', required: true },
    featureImage: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: { 
    url: { type: 'string', resolve: (update) => `/updates/${update._raw.flattenedPath}` },
  },
}))

export default makeSource({ 
  contentDirPath: 'pages/updates',
  documentTypes: [Update],
  disableImportAliasWarning: true
})