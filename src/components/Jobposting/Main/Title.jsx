import React from 'react';
import OutLineButton from '../../Ui/OutLineButton';
import Button, { BUTTON_THEME } from '../../Ui/Button';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import DeletOutLineButton from '../../Ui/DeletOutLineButton';

const Wrap = styled.div`
  text-align: center;
`;

const TitleText = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const Sub = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Filter = styled.div`
  display: flex;
  flex-flow: wrap;

  > * {
    margin-right: 1rem;
  }
`;

const Title = ({
  leftButtonOnClickHandler,
  rightButtonOnClickHandler,
  filterOptions = {},
  onDeleteHandler,
  style,
}) => {
  const { email } = useSelector((state) => state.user);
  const isLoggiend = !!email;

  return (
    <Wrap style={style}>
      <TitleText>회사를 추천합니다.</TitleText>
      <Sub>
        <OutLineButton onClick={leftButtonOnClickHandler}>
          태그 딱 맞는 기업 찾기
        </OutLineButton>
        {isLoggiend && (
          <Button
            theme={BUTTON_THEME.PRIMARY}
            type="button"
            onClick={rightButtonOnClickHandler}
          >
            채용 공고 올리기
          </Button>
        )}
      </Sub>
      <Filter>
        {Object.entries(filterOptions).map(([key, array]) => {
          return array.map(({ value, name }) => (
            <DeletOutLineButton
              key={value}
              onDeleteHandler={onDeleteHandler.bind(this, { key, value })}
            >
              {name}
            </DeletOutLineButton>
          ));
        })}
      </Filter>
    </Wrap>
  );
};

export default Title;
