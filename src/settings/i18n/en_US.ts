import { ILanguage } from '@src/types';

const en_US: ILanguage = {
  type: 'en',

  attributes: {
    for: 'Force',
    dex: 'Dexterity',
    con: 'Constitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    cha: 'Charisma',
  },

  skills: {
    acrobatics: 'Acrobatics',
    animalHandling: 'Animal Handling',
    arcana: 'Arcana',
    athletics: 'Athletics',
    deception: 'Deception',
    history: 'History',
    insight: 'Insight',
    intimidation: 'Intimidation',
    investigation: 'Investigation',
    medicine: 'Medicine',
    nature: 'Nature',
    perception: 'Perception',
    performance: 'Performance',
    persuasion: 'Persuasion',
    religion: 'Religion',
    sleight: 'Prestidigtação',
    stealth: 'Stealth',
    survival: 'Survival',
  },

  pages: {
    Auth: {
      title: 'Welcome',
      description: 'Have your RPG cards in one place',
    },

    Dashboard: {
      welcome: 'Welcome,',

      cards: {
        create: {
          title: 'Add',
          description: 'Add a new character card to your roster.',
        },

        view: {
          title: 'Search',
          description: 'Search and view cards from other platform users.',
        },
      },

      modal: {
        title: 'Sign out',
        description: 'Are you sure you want to log out of your account?',
      },
    },

    Card: {
      name: 'Name',
      level: 'Leve',
      proficiency: 'Proficiency',
      race: 'Race',
      class: 'Class',
      hp: 'HP',
      notes: 'Notes',

      modal: {
        edit: 'Edit',
        remove: 'Remove',
        copy: 'Copy',

        title: 'Remove',
        description:
          'Are you sure you want to remove your card? Cannot undo this action.',
      },
    },

    FormCard: {
      attributes: 'Attributes',
      inputs: {
        name: {
          label: 'Name',
          placeholder: "My character's name is...",
        },

        level: {
          label: 'Level',
        },

        race: {
          label: 'Race',
        },

        class: {
          label: 'Class',
        },

        hp: {
          label: 'HP',
        },

        notes: {
          label: 'Notes',
          placeholder: 'My notes are...',
        },
      },

      button: 'Confirm',
    },

    SearchCard: {
      options: {
        search: 'Search',
      },

      buttons: {
        search: 'Search',
        back: 'Back',
        clean: 'Clean',
      },

      inputs: {
        email: {
          label: 'E-mail',
          placeholder: 'Search for e-mail...',
        },

        race: {
          label: 'Race',
          void: 'No filter',
        },

        class: {
          label: 'Class',
          void: 'No filter',
        },
      },
    },
  },
};

export { en_US };
