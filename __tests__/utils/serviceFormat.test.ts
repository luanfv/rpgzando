import { IClassService, IRaceService } from '@src/types';
import { IFormatCardSelected } from '@src/types/utils';
import { formatRace, formatClass, formatCard } from '@src/utils/serviceFormat';

describe('src/utils/serviceFormat', () => {
  const mockRaceService: jest.Mocked<IRaceService> = {
    descriptionEN: '+2 DEX, +1 CHA',
    descriptionPT: '+2 DES, +1 CAR',
    nameEN: 'Dark Elf',
    namePT: 'Elfo Negro',
  } as IRaceService;

  const mockClassService: jest.Mocked<IClassService> = {
    nameEN: 'Druid',
    namePT: 'Druida',
  } as IClassService;

  const mockCardService: jest.Mocked<IFormatCardSelected> = {
    class: mockClassService,
    race: mockRaceService,
  } as IFormatCardSelected;

  describe('function formatRace', () => {
    it('Should language portuguese', () => {
      const response = formatRace(mockRaceService, 'pt');

      expect(response.name).toBe(mockRaceService.namePT);
      expect(response.description).toBe(mockRaceService.descriptionPT);
    });

    it('Should language english', () => {
      const response = formatRace(mockRaceService, 'en');

      expect(response.name).toBe(mockRaceService.nameEN);
      expect(response.description).toBe(mockRaceService.descriptionEN);
    });
  });

  describe('function formatClass', () => {
    it('Should language portuguese', () => {
      const response = formatClass(mockClassService, 'pt');

      expect(response.name).toBe(mockClassService.namePT);
    });

    it('Should language english', () => {
      const response = formatClass(mockClassService, 'en');

      expect(response.name).toBe(mockClassService.nameEN);
    });
  });

  describe('function formatCard', () => {
    it('Should language portuguese', () => {
      const response = formatCard(mockCardService, 'pt');

      expect(response.class.name).toBe(mockClassService.namePT);
      expect(response.race.name).toBe(mockRaceService.namePT);
      expect(response.race.description).toBe(mockRaceService.descriptionPT);
    });

    it('Should language english', () => {
      const response = formatCard(mockCardService, 'en');

      expect(response.class.name).toBe(mockClassService.nameEN);
      expect(response.race.name).toBe(mockRaceService.nameEN);
      expect(response.race.description).toBe(mockRaceService.descriptionEN);
    });
  });
});
