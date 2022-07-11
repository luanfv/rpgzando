interface IRaceService {
  index: string;
  race: string;
  image: string;
  nameEN: string;
  namePT: string;
  descriptionEN: string;
  descriptionPT: string;
}

interface IRace
  extends Omit<
    IRaceService,
    'nameEN' | 'namePT' | 'descriptionEN' | 'descriptionPT'
  > {
  name: string;
  description: string;
}

export { IRaceService, IRace };
