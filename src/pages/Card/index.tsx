import React, { useCallback, useMemo, useState } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { IRoutes } from '@src/types/routes';
import {
  Body,
  Column2X,
  Header,
  Information,
  ModalConfirm,
  CharacterPhoto,
} from '@src/components';
import { useAuth, useLanguage, useSkill, useToast } from '@src/hooks';
import { serviceCards } from '@src/services';

const Card: React.FC = () => {
  const { params } = useRoute<RouteProp<IRoutes, 'Card'>>();
  const { goBack, navigate } = useNavigation<NavigationProp<IRoutes, 'Card'>>();

  const { language } = useLanguage();
  const { user } = useAuth();
  const { calcModifier, calcProficiency } = useSkill();
  const { onToast } = useToast(language.toasts);

  const [titleModal, setTitleModal] = useState('');
  const [descriptionModal, setDescriptionModal] = useState('');

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
          .then(() => {
            onToast('SUCCESSFUL');
            goBack();
          })
          .catch(() => handleCloseRemoveModal());
      }
    },
    [goBack, handleCloseRemoveModal, onToast, user],
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
        <CharacterPhoto source={{ uri: card.race.image }} />

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

        <Information
          title={language.pages.Card.notes}
          value={card.notes ? card.notes : 'Void'}
        />

        <Column2X
          title={`${language.pages.Card.attributes}:`}
          items={[
            <Information
              title={language.attributes.for}
              value={`${card.attributes.for} (${calcModifier(
                card.attributes.for,
              )})`}
            />,
            <Information
              title={language.attributes.wis}
              value={`${card.attributes.wis} ${
                card && `(${calcModifier(card.attributes.wis)})`
              }`}
            />,
            <Information
              title={language.attributes.dex}
              value={`${card.attributes.dex} (${calcModifier(
                card.attributes.dex,
              )})`}
            />,
            <Information
              title={language.attributes.int}
              value={`${card.attributes.int} (${calcModifier(
                card.attributes.int,
              )})`}
            />,
            <Information
              title={language.attributes.con}
              value={`${card.attributes.con} (${calcModifier(
                card.attributes.con,
              )})`}
            />,
            <Information
              title={language.attributes.cha}
              value={`${card.attributes.cha} (${calcModifier(
                card.attributes.cha,
              )})`}
            />,
          ]}
        />

        <Column2X
          title={`${language.pages.Card.skills}:`}
          items={[
            <Information
              title={language.skills.acrobatics}
              value={String(card.skills.acrobatics)}
            />,
            <Information
              title={language.skills.animalHandling}
              value={String(card.skills.animalHandling)}
            />,
            <Information
              title={language.skills.arcana}
              value={String(card.skills.arcana)}
            />,
            <Information
              title={language.skills.athletics}
              value={String(card.skills.athletics)}
            />,
            <Information
              title={language.skills.deception}
              value={String(card.skills.deception)}
            />,
            <Information
              title={language.skills.history}
              value={String(card.skills.history)}
            />,
            <Information
              title={language.skills.insight}
              value={String(card.skills.insight)}
            />,
            <Information
              title={language.skills.intimidation}
              value={String(card.skills.intimidation)}
            />,
            <Information
              title={language.skills.investigation}
              value={String(card.skills.investigation)}
            />,
            <Information
              title={language.skills.medicine}
              value={String(card.skills.medicine)}
            />,
            <Information
              title={language.skills.nature}
              value={String(card.skills.nature)}
            />,
            <Information
              title={language.skills.perception}
              value={String(card.skills.perception)}
            />,
            <Information
              title={language.skills.performance}
              value={String(card.skills.performance)}
            />,
            <Information
              title={language.skills.persuasion}
              value={String(card.skills.persuasion)}
            />,
            <Information
              title={language.skills.religion}
              value={String(card.skills.religion)}
            />,
            <Information
              title={language.skills.sleight}
              value={String(card.skills.sleight)}
            />,
            <Information
              title={language.skills.stealth}
              value={String(card.skills.stealth)}
            />,
            <Information
              title={language.skills.survival}
              value={String(card.skills.survival)}
            />,
          ]}
        />
      </Body>

      <ModalConfirm
        isVisible={isModalOpen}
        title={titleModal}
        description={descriptionModal}
        confirm={language.modal.confirm}
        cancel={language.modal.cancel}
        onClose={handleCloseRemoveModal}
        onConfirm={() => handleRemoveCard(card.id)}
        isAttention
      />
    </>
  );
};

export { Card };
