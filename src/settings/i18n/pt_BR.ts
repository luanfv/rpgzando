import { ILanguage } from '@src/types';

const pt_BR: ILanguage = {
  type: 'pt',

  attributes: {
    for: 'Força',
    dex: 'Destreza',
    con: 'Constituição',
    int: 'Inteligência',
    wis: 'Sabedoria',
    cha: 'Carisma',
  },

  skills: {
    acrobatics: 'Acrobacias',
    animalHandling: 'Adestrar Animais',
    arcana: 'Arcanismo',
    athletics: 'Atletismo',
    deception: 'Enganação',
    history: 'História',
    insight: 'Intuição',
    intimidation: 'Intimidação',
    investigation: 'Investigação',
    medicine: 'Medicina',
    nature: 'Natureza',
    perception: 'Percepção',
    performance: 'Atuação',
    persuasion: 'Persuasão',
    religion: 'Religião',
    sleight: 'Prestidigtação',
    stealth: 'Furtividade',
    survival: 'Sobrevivência',
  },

  pages: {
    Auth: {
      title: 'Bem-vindo(a)',
      description: 'Tenha suas fichas de RPG em apenas um lugar',
    },

    Dashboard: {
      welcome: 'Bem-vindo(a),',

      cards: {
        create: {
          title: 'Adicionar',
          description: 'Adicione uma nova ficha de personagem à sua lista.',
        },

        view: {
          title: 'Pesquisar',
          description:
            'Pesquise e visualize fichas de outros usuários da plataforma.',
        },
      },

      modal: {
        title: 'Sair da conta',
        description: 'Tem certeza que deseja sair da sua conta?',
      },
    },

    Card: {
      name: 'Nome',
      level: 'Nível',
      proficiency: 'Proficiência',
      race: 'Raça',
      class: 'Classe',
      hp: 'HP',
      notes: 'Anotações',
      attributes: 'Atributos',
      skills: 'Habilidades',

      modal: {
        edit: 'Editar',
        remove: 'Remover',
        copy: 'Copiar',

        title: 'Remover',
        description:
          'Tem certeza que você deseja remover esta ficha? Essa ação não podera ser desfeita.',
      },
    },

    FormCard: {
      attributes: 'Atributos',
      inputs: {
        name: {
          label: 'Nome',
          placeholder: 'Nome do meu personagem é...',
        },

        level: {
          label: 'Nível',
        },

        race: {
          label: 'Raça',
        },

        class: {
          label: 'Classe',
        },

        hp: {
          label: 'HP',
        },

        notes: {
          label: 'Anotações',
          placeholder: 'Minhas anotações são...',
        },
      },

      button: 'Confirmar',
    },

    SearchCard: {
      options: {
        search: 'Pesquisar',
      },

      buttons: {
        search: 'Pesquisar',
        back: 'Voltar',
        clean: 'Limpar',
      },

      inputs: {
        email: {
          label: 'E-mail',
          placeholder: 'Pesquise pelo e-mail...',
        },

        race: {
          label: 'Raça',
          void: 'Sem filtro',
        },

        class: {
          label: 'Classe',
          void: 'Sem filtro',
        },
      },
    },
  },
};

export { pt_BR };
