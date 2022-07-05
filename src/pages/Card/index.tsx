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
            title={language.pages.Card.for}
            value={`${card.attributes.for} (${calcModifier(
              card.attributes.for,
            )})`}
            width={48}
          />

          <Information
            title={language.pages.Card.wis}
            value={`${card.attributes.wis} ${
              card && `(${calcModifier(card.attributes.wis)})`
            }`}
            width={48}
          />

          <Information
            title={language.pages.Card.dex}
            value={`${card.attributes.dex} (${calcModifier(
              card.attributes.dex,
            )})`}
            width={48}
          />

          <Information
            title={language.pages.Card.int}
            value={`${card.attributes.int} (${calcModifier(
              card.attributes.int,
            )})`}
            width={48}
          />

          <Information
            title={language.pages.Card.con}
            value={`${card.attributes.con} (${calcModifier(
              card.attributes.con,
            )})`}
            width={48}
          />

          <Information
            title={language.pages.Card.cha}
            value={`${card.attributes.cha} (${calcModifier(
              card.attributes.cha,
            )})`}
            width={48}
          />
        </Columns>

        <Columns>
          <Information
            title="Acrobatics"
            value={String(card.skills.acrobatics)}
            width={48}
          />

          <Information
            title="Animal Handling"
            value={String(card.skills.animalHandling)}
            width={48}
          />

          <Information
            title="Arcana"
            value={String(card.skills.arcana)}
            width={48}
          />

          <Information
            title="Athletics"
            value={String(card.skills.athletics)}
            width={48}
          />

          <Information
            title="Deception"
            value={String(card.skills.deception)}
            width={48}
          />

          <Information
            title="History"
            value={String(card.skills.history)}
            width={48}
          />

          <Information
            title="Insight"
            value={String(card.skills.insight)}
            width={48}
          />

          <Information
            title="Intimidation"
            value={String(card.skills.intimidation)}
            width={48}
          />

          <Information
            title="Investigation"
            value={String(card.skills.investigation)}
            width={48}
          />

          <Information
            title="Medicine"
            value={String(card.skills.medicine)}
            width={48}
          />

          <Information
            title="Nature"
            value={String(card.skills.nature)}
            width={48}
          />

          <Information
            title="Perception"
            value={String(card.skills.perception)}
            width={48}
          />

          <Information
            title="Performance"
            value={String(card.skills.performance)}
            width={48}
          />

          <Information
            title="Persuasion"
            value={String(card.skills.persuasion)}
            width={48}
          />

          <Information
            title="Religion"
            value={String(card.skills.religion)}
            width={48}
          />

          <Information
            title="Sleight"
            value={String(card.skills.sleight)}
            width={48}
          />

          <Information
            title="Stealth"
            value={String(card.skills.stealth)}
            width={48}
          />

          <Information
            title="Survival"
            value={String(card.skills.survival)}
            width={48}
          />
        </Columns>

        <Information
          title={language.pages.Card.proficiencies}
          value={card.proficiencies}
        />

        <Information title={language.pages.Card.items} value={card.items} />

        {!!card.notes && (
          <Information title={language.pages.Card.notes} value={card.notes} />
        )}

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
