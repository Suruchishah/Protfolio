export default {
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    {
      name: 'institution',
      title: 'Institution Name',
      type: 'string',
      initialValue: 'IOE, Purwanchal Campus',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'degree',
      title: 'Degree Title',
      type: 'string',
      initialValue: 'Bachelor’s in Computer Engineering',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year / Period',
      type: 'string',
      initialValue: '2025',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: 'I graduated with a Bachelor’s degree in Computer Engineering, building a strong foundation in technology, problem-solving, and digital systems.',
    },
    {
      name: 'skills',
      title: 'Skills Learned / Covered',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Computer Engineering',
        'Digital Systems',
        'Software Architecture',
        'Technical Problem Solving',
      ],
    },
  ],
};
