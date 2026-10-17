export default {
  name: 'services',
  title: 'Services Section',
  type: 'document',
  fields: [
    {
      name: 'sectionLabel',
      title: 'Section Tagline / Subtitle',
      type: 'string',
      initialValue: 'WHAT I DO — SERVICES & STRATEGY',
    },
    {
      name: 'mainTitle',
      title: 'Main Headline',
      type: 'string',
      initialValue: 'Building Better Digital Experiences',
    },
    {
      name: 'paragraph1',
      title: 'First Paragraph',
      type: 'text',
      initialValue: 'I help businesses use content strategy and customer behavior analysis to build better digital experiences. I look at how customers discover, interact with, and move through a website or product, then turn those observations into practical recommendations for improving the experience, content, and overall product.',
    },
    {
      name: 'paragraph2',
      title: 'Second Paragraph',
      type: 'text',
      initialValue: 'With a background in computer engineering and hands-on experience in marketing, customer analysis, content, and digital products, I bring a combination of technical thinking, creative strategy, and business understanding to every project I work on.',
    },
    {
      name: 'serviceCards',
      title: 'Service Offerings / Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'string', title: 'Card Number (e.g. 01)' },
            { name: 'title', type: 'string', title: 'Service Title' },
            { name: 'description', type: 'text', title: 'Service Summary' },
            { name: 'tags', type: 'array', of: [{ type: 'string' }], title: 'Tags' },
          ],
        },
      ],
    },
  ],
};
