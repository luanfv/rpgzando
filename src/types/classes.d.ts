interface IClassService {
  index: string;
  nameEN: string;
  namePT: string;
  image: string;
  hp: number;
}

interface IClass extends Omit<IClassService, 'nameEN' | 'namePT'> {
  name: string;
}

export { IClassService, IClass };
