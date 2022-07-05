import { ILanguage } from '@src/types';

const en_US: ILanguage = {
  type: 'en',

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
      for: 'Force',
      dex: 'Dexterity',
      con: 'Constitution',
      wis: 'Wisdom',
      int: 'Intelligence',
      cha: 'Charisma',
      items: 'Items',
      notes: 'Notes',
      proficiencies: 'Proficiencies',

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

        for: {
          label: 'Force',
        },

        dex: {
          label: 'Dexterity',
        },

        con: {
          label: 'Constitution',
        },

        int: {
          label: 'Intelligence',
        },

        wis: {
          label: 'Wisdom',
        },

        cha: {
          label: 'Charisma',
        },

        proficiencies: {
          label: 'Proficiencies',
          placeholder: 'My proficiencies are...',
        },

        items: {
          label: 'Items',
          placeholder: 'My items are...',
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
