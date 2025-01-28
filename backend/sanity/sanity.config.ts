import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'dummyProject',

  projectId: '99i06wdo',
  dataset: 'dummydata',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
