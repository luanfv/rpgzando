type ILanguageType = 'en' | 'pt';

interface ILanguage {
  type: ILanguageType;

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

      modal: {
        title: string;
        description: string;
      };
    };

    FormCard: {
      attributes: string;
      inputs: {
        name: {
          label: string;
          placeholder: string;
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

        for: {
          label: string;
        };

        dex: {
          label: string;
        };

        con: {
          label: string;
        };

        int: {
          label: string;
        };

        wis: {
          label: string;
        };

        cha: {
          label: string;
        };

        proficiencies: {
          label: string;
          placeholder: string;
        };

        items: {
          label: string;
          placeholder: string;
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

      for: string;

      dex: string;

      con: string;

      int: string;

      wis: string;

      cha: string;

      proficiencies: string;

      items: string;

      notes: string;
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

export { ILanguage, ILanguageType };
