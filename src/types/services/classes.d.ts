interface IProficiency {
  index: string;
  nameEN: string;
}

interface IProficiencyResponse {
  index: string;
  name: string;
}

interface IServiceClasseGet {
  index: string;
  nameEN: string;
  namePT: string;
  image: string;
  hp: number;
  proficiency?: {
    choose: number;
    data: IProficiency[];
  };
}

interface IServiceClasseGetResponse {
  index: string;
  name: string;
  image: string;
  hp: number;
  proficiency?: {
    choose: number;
    data: IProficiencyResponse[];
  };
}

export { IServiceClasseGet, IServiceClasseGetResponse };
