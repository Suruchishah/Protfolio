export default {
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'employmentType',
      title: 'Employment Type (e.g. Full-time, Part-time)',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Contract', value: 'Contract' },
          { title: 'Freelance', value: 'Freelance' },
        ],
      },
    },
    {
      name: 'role',
      title: 'Role Title',
      type: 'string',
      initialValue: 'Marketing Coordinator',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order (lower numbers show first)',
      type: 'number',
      initialValue: 1,
    },
    {
      name: 'description',
      title: 'Detailed Role Description',
      type: 'text',
    },
    {
      name: 'skills',
      title: 'Skill Tag Pills',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
