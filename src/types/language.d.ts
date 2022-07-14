type ILanguageType = 'en' | 'pt';

interface ILanguageToast {
  noConnection: {
    text1: string;
    text2: string;
  };

  successful: {
    text1: string;
    text2: string;
  };

  cardLimit: {
    text1: string;
    text2: string;
  };
}

interface ILanguage {
  type: ILanguageType;

  toasts: ILanguageToast;

  skills: {
    acrobatics: string;
    animalHandling: string;
    arcana: string;
    athletics: string;
    deception: string;
    history: string;
    insight: string;
    intimidation: string;
    investigation: string;
    medicine: string;
    nature: string;
    perception: string;
    performance: string;
    persuasion: string;
    religion: string;
    sleight: string;
    stealth: string;
    survival: string;
  };

  attributes: {
    for: string;
    dex: string;
    con: string;
    int: string;
    wis: string;
    cha: string;
  };

  modal: {
    title: string;
    description: string;
    confirm: string;
    cancel: string;
  };

  pages: {
    Auth: {
      title: string;
      description: string;
    };

    Dashboard: {
      welcome: string;

      cards: {
        create: {
          title: string;
          description: string;
        };

        view: {
          title: string;
          description: string;
        };
      };
    };

    FormCard: {
      attributes: string;
      skills: string;
      inputs: {
        name: {
          label: string;
          placeholder: string;
          error: string;
        };

        level: {
          label: string;
        };

        race: {
          label: string;
        };

        class: {
          label: string;
        };

        hp: {
          label: string;
        };

        notes: {
          label: string;
          placeholder: string;
        };
      };

      button: string;
    };

    Card: {
      modal: {
        edit: string;
        remove: string;
        copy: string;

        title: string;
        description: string;
      };

      name: string;
      level: string;
      proficiency: string;
      race: string;
      class: string;
      hp: string;
      notes: string;
      attributes: string;
      skills: string;
    };

    SearchCard: {
      options: {
        search: string;
      };

      buttons: {
        search: string;
        back: string;
        clean: string;
      };

      inputs: {
        email: {
          label: string;
          placeholder: string;
        };

        race: {
          label: string;
          void: string;
        };

        class: {
          label: string;
          void: string;
        };
      };
    };
  };
}

export { ILanguage, ILanguageType, ILanguageToast };
