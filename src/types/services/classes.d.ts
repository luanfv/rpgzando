interface ISkillResponse {
  index: string;
  nameEN: string;
}

interface ISkill {
  index: string;
  name: string;
}

interface IServiceClasseGet {
  index: string;
  nameEN: string;
  namePT: string;
  image: string;
  hp: number;

  skills: {
    choose: number;
    data: ISkillResponse[];
  };
}

interface IServiceClasseGetResponse {
  index: string;
  name: string;
  image: string;
  hp: number;

  skills: {
    choose: number;
    data: ISkill[];
  };
}

export { IServiceClasseGet, IServiceClasseGetResponse, ISkill, ISkillResponse };
