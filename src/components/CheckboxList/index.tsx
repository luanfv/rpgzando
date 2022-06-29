import React from 'react';

import { Checkbox } from '@src/components/Checkbox';
import { ICheckboxList } from '@src/types/components';
import { Container, Title } from './style';

const CheckboxList: React.FC<ICheckboxList> = ({
  title,
  item,
  isCheckedCheckbox,
  handleToggleCheckbox,
}) => {
  return (
    <Container>
      <Title>{title}</Title>

      {item.map((data) => (
        <Checkbox
          key={data.index}
          checked={isCheckedCheckbox(data.index)}
          description={data.name}
          onChange={() => handleToggleCheckbox(data.index)}
        />
      ))}
    </Container>
  );
};

export { CheckboxList };
