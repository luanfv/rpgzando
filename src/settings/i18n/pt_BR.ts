import { ILanguage } from '@src/types';

const pt_BR: ILanguage = {
  type: 'pt',

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
      for: 'Força',
      dex: 'Destreza',
      con: 'Constituição',
      wis: 'Sabedoria',
      int: 'Inteligência',
      cha: 'Carisma',
      items: 'Itens',
      notes: 'Anotações',
      proficiencies: 'Proficiências',

      modal: {
        edit: 'Editar',
        remove: 'Remover',

        title: 'Remover',
        description:
          'Tem certeza que você deseja remover esta ficha? Essa ação não podera ser desfeita.',
      },
    },

    FormCard: {
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

        for: {
          label: 'Força',
        },

        dex: {
          label: 'Destreza',
        },

        con: {
          label: 'Constituição',
        },

        int: {
          label: 'Inteligência',
        },

        wis: {
          label: 'Sabedoria',
        },

        cha: {
          label: 'Carisma',
        },

        proficiencies: {
          label: 'Proficiências',
          placeholder: 'Minhas proficiências são...',
        },

        items: {
          label: 'Itens',
          placeholder: 'Meus itens são...',
        },

        notes: {
          label: 'Anotações',
          placeholder: 'Minhas anotações são...',
        },
      },

      button: 'Confirmar',
    },
  },
};

export { pt_BR };
