import React from 'react';
import { ScrollView } from 'react-native';

import { IMenuList } from '@src/types/components';
import { MenuItem } from './Item';

const MenuList: React.FC<IMenuList> = ({ items }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {items.map((item, index) => {
        return (
          <MenuItem
            key={index}
            isMain={item.isMain}
            type={item.type}
            onPress={item.onPress}
          />
        );
      })}
    </ScrollView>
  );
};

export { MenuList };
