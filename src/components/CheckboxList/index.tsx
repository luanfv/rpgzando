import React from 'react';

import { Checkbox } from '@src/components/Checkbox';
import { ICheckboxList } from '@src/types/components';
import { Container, Title } from './style';

const CheckboxList: React.FC<ICheckboxList> = ({
  title,
  skills,
  isCheckedCheckbox,
  handleToggleCheckbox,
}) => {
  return (
    <Container>
      <Title>{title}</Title>

      {skills.data.map((item) => (
        <Checkbox
          key={item.index}
          checked={isCheckedCheckbox(item.index)}
          description={item.name}
          onChange={() => handleToggleCheckbox(item.index)}
        />
      ))}
    </Container>
  );
};

export { CheckboxList };
