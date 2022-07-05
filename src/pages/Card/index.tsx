import React, { useCallback, useMemo, useState } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { IRoutes } from '@src/types/routes';
import { Body, Header, Information, ModalConfirm } from '@src/components';
import { useAuth, useLanguage, useSkill } from '@src/hooks';
import { Columns, Image } from './styles';
import { serviceCards } from '@src/services';

const Card: React.FC = () => {
  const { params } = useRoute<RouteProp<IRoutes, 'Card'>>();
  const { goBack, navigate } = useNavigation<NavigationProp<IRoutes, 'Card'>>();
  const { calcModifier, calcProficiency } = useSkill();

  const [titleModal, setTitleModal] = useState('');
  const [descriptionModal, setDescriptionModal] = useState('');

  const { language } = useLanguage();
  const { user } = useAuth();

  const handleOpenRemoveModal = useCallback(() => {
    setTitleModal(language.pages.Card.modal.title);
    setDescriptionModal(language.pages.Card.modal.description);
  }, [language.pages.Card.modal.description, language.pages.Card.modal.title]);

  const handleCloseRemoveModal = useCallback(() => {
    setTitleModal('');
    setDescriptionModal('');
  }, []);

  const handleRemoveCard = useCallback(
    (cardId) => {
      if (user) {
        serviceCards
          .delete(user.uid, cardId)
          .then(() => goBack())
          .catch(() => handleCloseRemoveModal());
      }
    },
    [goBack, handleCloseRemoveModal, user],
  );

  const isModalOpen = useMemo(
    () => !!titleModal && !!descriptionModal,
    [descriptionModal, titleModal],
  );

  const card = useMemo(() => {
    return params;
  }, [params]);

  const options = useMemo(() => {
    if (user && card.email === user.email) {
      return [
        {
          label: language.pages.Card.modal.edit,
          onPress: () => navigate('FormCard', card),
        },
        {
          label: language.pages.Card.modal.remove,
          onPress: handleOpenRemoveModal,
        },
      ];
    }

    return [
      {
        label: language.pages.Card.modal.copy,
        onPress: () => navigate('FormCard', card),
      },
    ];
  }, [
    card,
    handleOpenRemoveModal,
    language.pages.Card.modal.copy,
    language.pages.Card.modal.edit,
    language.pages.Card.modal.remove,
    navigate,
    user,
  ]);

  return (
    <>
      <Header onBack={goBack} options={options} />

      <Body>
        <Image source={{ uri: card.race.image }} />

        <Information title={language.pages.Card.name} value={card.name} />

        <Information
          title={language.pages.Card.level}
          value={String(card.level)}
        />

        <Information
          title={language.pages.Card.proficiency}
          value={String(calcProficiency(card.level))}
        />

        <Information title={language.pages.Card.race} value={card.race.name} />

        <Information
          title={language.pages.Card.class}
          value={card.class.name}
        />

        <Information title={language.pages.Card.hp} value={String(card.hp)} />

        <Columns>
          <Information
            title={language.attributes.for}
            value={`${card.attributes.for} (${calcModifier(
              card.attributes.for,
            )})`}
            width={48}
          />

          <Information
            title={language.attributes.wis}
            value={`${card.attributes.wis} ${
              card && `(${calcModifier(card.attributes.wis)})`
            }`}
            width={48}
          />

          <Information
            title={language.attributes.dex}
            value={`${card.attributes.dex} (${calcModifier(
              card.attributes.dex,
            )})`}
            width={48}
          />

          <Information
            title={language.attributes.int}
            value={`${card.attributes.int} (${calcModifier(
              card.attributes.int,
            )})`}
            width={48}
          />

          <Information
            title={language.attributes.con}
            value={`${card.attributes.con} (${calcModifier(
              card.attributes.con,
            )})`}
            width={48}
          />

          <Information
            title={language.attributes.cha}
            value={`${card.attributes.cha} (${calcModifier(
              card.attributes.cha,
            )})`}
            width={48}
          />
        </Columns>

        <Columns>
          <Information
            title={language.skills.acrobatics}
            value={String(card.skills.acrobatics)}
            width={48}
          />

          <Information
            title={language.skills.animalHandling}
            value={String(card.skills.animalHandling)}
            width={48}
          />

          <Information
            title={language.skills.arcana}
            value={String(card.skills.arcana)}
            width={48}
          />

          <Information
            title={language.skills.athletics}
            value={String(card.skills.athletics)}
            width={48}
          />

          <Information
            title={language.skills.deception}
            value={String(card.skills.deception)}
            width={48}
          />

          <Information
            title={language.skills.history}
            value={String(card.skills.history)}
            width={48}
          />

          <Information
            title={language.skills.insight}
            value={String(card.skills.insight)}
            width={48}
          />

          <Information
            title={language.skills.intimidation}
            value={String(card.skills.intimidation)}
            width={48}
          />

          <Information
            title={language.skills.investigation}
            value={String(card.skills.investigation)}
            width={48}
          />

          <Information
            title={language.skills.medicine}
            value={String(card.skills.medicine)}
            width={48}
          />

          <Information
            title={language.skills.nature}
            value={String(card.skills.nature)}
            width={48}
          />

          <Information
            title={language.skills.perception}
            value={String(card.skills.perception)}
            width={48}
          />

          <Information
            title={language.skills.performance}
            value={String(card.skills.performance)}
            width={48}
          />

          <Information
            title={language.skills.persuasion}
            value={String(card.skills.persuasion)}
            width={48}
          />

          <Information
            title={language.skills.religion}
            value={String(card.skills.religion)}
            width={48}
          />

          <Information
            title={language.skills.sleight}
            value={String(card.skills.sleight)}
            width={48}
          />

          <Information
            title={language.skills.stealth}
            value={String(card.skills.stealth)}
            width={48}
          />

          <Information
            title={language.skills.survival}
            value={String(card.skills.survival)}
            width={48}
          />
        </Columns>

        <Information
          title={language.pages.Card.notes}
          value={card.notes ? card.notes : 'Void'}
        />

        <ModalConfirm
          isVisible={isModalOpen}
          title={titleModal}
          description={descriptionModal}
          onClose={handleCloseRemoveModal}
          onConfirm={() => handleRemoveCard(card.id)}
          isAttention
        />
      </Body>
    </>
  );
};

export { Card };
