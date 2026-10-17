import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Suruchi Shah Portfolio Studio',

  // Replace with your Sanity Project ID & Dataset after running `npx sanity init`
  projectId: 'YOUR_SANITY_PROJECT_ID',
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});
