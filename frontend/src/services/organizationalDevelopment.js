let organizationalDevelopment = {
  'Organizational Development': {
    description: '',
    services: [
      {
        name: 'Developing Team Roles and Responsibilites',
        benefits: [`Spokes need a template for defining their roles and responsibilites.
                  This template should also be visible to other spokes.`],
        outputs: [`A Circles template containing their roles and responsibilities.`],
        methods: [`Team Workshop`],
        availability: true,
        members: [`Sarah Durlacher`],
        hours: null,
        links: []
      },
      {
        name: 'Mesh Radio / Video',
        benefits: [`Mesh Radio can be used as a way to present your work to the Mesh.
                  With the help of the videography circle, it is possible to also
                  record exercises/planning (such as developing a business model
                  canvas) for later reference or sharing.`],
        outputs: ['Mesh Radio', 'Powerpoint Presentation', 'Video'],
        methods: [`Team Workshop`],
        availability: true,
        members: [`Sarah Durlacher`, 'Jose Caballer'],
        hours: 2,
        links: []
      },
      {
        name: 'Retrospective Facilitation',
        benefits: [`Reflecting on what went well and what could have been done better --
                  are a crucial part of growth. This is done with an eye towards rules,
                  habits and processes.`],
        outputs: ['Document with summary of retrospective session'],
        methods: [`Team Workshop`],
        availability: true,
        members: [`Sarah Durlacher`],
        hours: 1.5,
        links: [{
          name: 'Example: Academy Retrospective',
          url: 'https://consensys.quip.com/UbnZAOaJjsXX/Developer-Program-A-Retrospective'
        }]
      },
      {
        name: 'Agile Training and Coaching',
        benefits: [`Better visibility among teammates, improved team alignment on tasks
                  and faster traction for their product.`],
        outputs: ['A team-specific scrum board (on Trello, Jira, etc.)', 'Team Agile Knowledge'],
        methods: ['Video', 'Team Workshop', '1-on-1 Coaching'],
        availability: true,
        members: [`Sarah Durlacher`, 'Jose Caballer', 'Nathaniel Chen'],
        hours: null,
        links: []
      },
      {
        name: 'OKR Facilitation and Training',
        benefits: [`Data-driven growth and metrics are a crucial part of business strategy.
                  Org Dev can help facilitate an ideation session.`],
        outputs: ['Clearly defined OKRs'],
        methods: ['Video', 'Workshops', '1-on-1 Coaching'],
        availability: true,
        members: ['Nathaniel Chen'],
        hours: 1.5,
        links: []
      },
      {
        name: 'Implementation of Decentralized Practices',
        benefits: [`Scaleable business practices, increased decision-making velocity
                  and an efficient + self-managed working environment.`],
        outputs: ['Custom and co-created practices as developed hand-in-hand with the team'],
        methods: ['Video', 'Workshops', '1-on-1 Coaching'],
        availability: false,
        members: [],
        hours: null,
        links: []
      },
      {
        name: 'Feedback Training and Coaching',
        benefits: [`People need to have a sense of progress and purpose. This can be provided by
                  teaching effective, efficient and kind feedback techniques, which establishes
                  accountability and drives personal development.`],
        outputs: ['Team-specific "Feedback Guidelines", as developed with the team'],
        methods: ['Workshops', '1-on-1 Coaching'],
        availability: false,
        members: [],
        hours: null,
        links: []
      },
      {
        name: 'Emotional Intelligence Training',
        benefits: [`The more empathy and understanding we can extend to our teammates, the better
                  our decision-making, communication efficacy and creative output. This foundation
                  of psychological safety goes a long way in building a meaningful work environment.`],
        outputs: [],
        methods: ['Team Workshops', '1-on-1 Coaching'],
        availability: false,
        members: [],
        hours: null,
        links: []
      },
      {
        name: 'Meeting Guidelines & Best Practices',
        benefits: [`Meetings and working sessions are the container in which collaboration occurs.
                  Organizational development can define when it's necessary to have a meeting,
                  various meeting structures and best practices.`],
        outputs: ['Team Specific Meeting Guidelines'],
        methods: ['Team Workshops'],
        availability: false,
        members: [],
        hours: null,
        links: []
      },
      {
        name: 'Facilitating Process Improvement',
        benefits: [`A spoke should understand its current state and how it will achieve its future state.
                  Process improvement is the mapping and implementation of this plan.`],
        outputs: ['Process Improvement Plan'],
        methods: ['Team Workshops'],
        availability: false,
        members: [],
        hours: null,
        links: []
      },
      {
        name: 'Skills Assessment and Development Plans',
        benefits: [`A skill and personal development plan provides a tangible sense of progress to
                  individuals and for many, is a source of motivation.`],
        outputs: ['Personal development plans for individuals'],
        methods: ['Workshops', '1-on-1 Coaching'],
        availability: false,
        members: [],
        hours: null,
        links: []
      },
      {
        name: 'Inter-spoke Collaboration & Communication',
        benefits: [`Spokes should be able to learn from and coordinate with other spokes.
                  This sharing of knowledge and direction creates a higher standard business
                  and technological practices.`],
        outputs: [],
        methods: ['Team Workshops'],
        availability: false,
        members: [],
        hours: null,
        links: []
      }
    ]
  }
}

export default organizationalDevelopment

/*
  services: {
    CircleName: [
      name: string,
      benefits: array,
      outputs: array,
      methods: array,
      availability: bool,
      members: array,
      hours: number,
      links: array
    ]
  }

*/
