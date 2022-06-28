import React, { useCallback, useMemo, useState } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { IRoutes } from '@src/types/routes';
import { Body, Header, Information, ModalConfirm } from '@src/components';
import { useLanguage, useSkill } from '@src/hooks';
import { Attributes, Image } from './styles';
import { serviceCards } from '@src/services';

const Card: React.FC = () => {
  const { params } = useRoute<RouteProp<IRoutes, 'Card'>>();
  const { goBack, navigate } = useNavigation<NavigationProp<IRoutes, 'Card'>>();
  const { calcModifier, calcProficiency } = useSkill();

  const [titleModal, setTitleModal] = useState('');
  const [descriptionModal, setDescriptionModal] = useState('');

  const { language } = useLanguage();

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
      serviceCards.delete(cardId).then(() => goBack());
    },
    [goBack],
  );

  const isModalOpen = useMemo(
    () => !!titleModal && !!descriptionModal,
    [descriptionModal, titleModal],
  );

  const card = useMemo(() => {
    return params;
  }, [params]);

  const options = useMemo(() => {
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
  }, [
    card,
    handleOpenRemoveModal,
    language.pages.Card.modal.edit,
    language.pages.Card.modal.remove,
    navigate,
  ]);

  return (
    <Body>
      <Header onBack={goBack} options={options} />

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

      <Information title={language.pages.Card.class} value={card.class.name} />

      <Information title={language.pages.Card.hp} value={String(card.hp)} />

      <Attributes>
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
      </Attributes>

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
  );
};

export { Card };
