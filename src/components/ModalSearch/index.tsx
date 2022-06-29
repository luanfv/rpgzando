import React from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';

import { ICheckboxListItem } from '@src/types/components';
import { Input, CheckboxList } from '@src/components';
import { Bar, Body, Container, Footer, Header, Modal, Text } from './styles';

interface IModalSearch {
  isVisible: boolean;
  email: string;

  classes: {
    data: ICheckboxListItem[];
    onToggleCheck: (item: string) => void;
    isChecked: (item: string) => boolean;
  };

  races: {
    data: ICheckboxListItem[];
    onToggleCheck: (item: string) => void;
    isChecked: (item: string) => boolean;
  };

  setEmail: (value: string) => void;
  onClose: () => void;
  onClean: () => void;
  onSearch: () => void;
}

const ModalSearch: React.FC<IModalSearch> = ({
  classes,
  email,
  isVisible,
  races,
  setEmail,
  onClean,
  onClose,
  onSearch,
}) => {
  const theme = useTheme();

  return (
    <Modal isVisible={isVisible}>
      <Container>
        <Header>
          <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
            <Text color="text">Back</Text>
          </TouchableOpacity>

          <Bar />

          <TouchableOpacity onPress={onClean} activeOpacity={0.8}>
            <Text color="attention">Clean</Text>
          </TouchableOpacity>
        </Header>

        <Body>
          <Input
            title="E-mail"
            placeholder="Search for e-mail..."
            onChangeText={setEmail}
            value={email}
          />

          <CheckboxList
            title="Races"
            item={races.data}
            isCheckedCheckbox={races.isChecked}
            handleToggleCheckbox={races.onToggleCheck}
          />

          <CheckboxList
            title="Classes"
            item={classes.data}
            isCheckedCheckbox={classes.isChecked}
            handleToggleCheckbox={classes.onToggleCheck}
          />
        </Body>

        <Footer>
          <Button
            title="Search"
            onPress={onSearch}
            color={theme.colors.secondary}
          />
        </Footer>
      </Container>
    </Modal>
  );
};

export { ModalSearch };
