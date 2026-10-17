export default {
  name: 'contact',
  title: 'Contact & Footer Info',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Contact Headline',
      type: 'string',
      initialValue: 'Let’s make something useful.',
    },
    {
      name: 'subcaption',
      title: 'Contact Sub-caption',
      type: 'string',
      initialValue: 'HAVE A PROJECT, ROLE, OR INTERESTING PROBLEM?',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      initialValue: 'ssuruchi333@gmail.com',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location Text',
      type: 'string',
      initialValue: 'Janakpurdham, Nepal',
    },
    {
      name: 'linkedinUrl',
      title: 'LinkedIn Profile URL',
      type: 'url',
      initialValue: 'https://www.linkedin.com/in/suruchi-shah-106510231/',
    },
    {
      name: 'githubUrl',
      title: 'GitHub Profile URL',
      type: 'url',
      initialValue: 'https://github.com/Suruchishah',
    },
  ],
};
