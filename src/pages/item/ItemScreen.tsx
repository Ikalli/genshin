import React from 'react';
import styled from 'styled-components';

import { ContentWrapper } from 'src/components';
import { DailyItem } from './DailyItem';
import { FieldMonsterDropItem } from './FieldMonsterDropItem';
import { WeeklyRewardItem } from './WeeklyRewardItem';
import { LocalContainer } from './local_special/LocalContainer';

const Inner = styled.div({
  width: '100%',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

interface Props {}

export function ItemScreen(props: Props) {
  return (
    <ContentWrapper>
      <Inner>
        <DailyItem />
        <WeeklyRewardItem />
        <FieldMonsterDropItem />
        <LocalContainer />
      </Inner>
    </ContentWrapper>
  );
}