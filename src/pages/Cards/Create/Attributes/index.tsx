import React, { useMemo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useCards } from '../../../../hooks/CardsContext';

import { professions } from '../../../../utils/rules';

import Content from '../../../../components/Content';
import ProgressBar from '../../../../components/ProgressBar';

import styles from '../../../../styles.json';

import { Main, InputNumeric } from './style';

const Attributes: React.FC = () => {
  const { level, profession } = useCards();

  const fullHp = useMemo(() => {
    const found = professions.find(
      (_profession) => _profession.id === profession.id,
    );

    return found?.hp;
  }, [profession.id]);

  return (
    <Content title="Nova Ficha" goBack>
      <Main>
        <ProgressBar phase={2} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: '#fff' }}>
            HP: ({level}d{fullHp})
          </Text>
          <TouchableOpacity style={{ paddingLeft: 30, paddingRight: 10, paddingBottom: 10 }}>
            <Icon name="dice" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <InputNumeric
          value={1}
          min={1}
          rounded
          textColor="#fff"
          fontSize={18}
          colorLeft={styles.primary}
          colorRight={styles.primary}
          colorPress={styles.secondary}
        />
      </Main>
    </Content>
  );
};

export default Attributes;
