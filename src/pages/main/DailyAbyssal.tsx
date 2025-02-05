import React from 'react';
import styled from 'styled-components';

import {
  weaponAscesionItemInfo,
  characterTalentItemInfo,
  WeaponAscesionItem,
  CharacterTalentItem,
  serverTimeInfo
} from 'src/resources/data';
import { FlexWrapper, RoundImage, TooltipText, GridWrapper } from 'src/components';
import { DailySetImages } from 'src/resources/images';
import { trans, Lang, KeyLang } from 'src/resources/languages';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';

const Container = styled.div({
  display: 'flex',
  padding: '10px 20px',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: 'rgba(20,20,20,.8)',
  fontSize: '20px',
  borderRadius: '16px',
  boxShadow: '10px 10px 6px rgba(0,0,0,0.7)',
  transition: '.2s ease-out',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(38,38,38,0.5)'
  },
  '@media screen and (max-width: 768px)': {
    width: '260px'
  }
});

const SetContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px 10px 0',
  '@media screen and (max-width: 768px)': {
    flexDirection: 'column',
    margin: '10px 0 0'
  }
});

const SubTitle = styled.div({
  margin: '0 0 10px',
  fontSize: '16px'
});

const ImageContainer = styled.div({
  position: 'relative',
  margin: '3px 3px'
});

type Items = WeaponAscesionItem | CharacterTalentItem;

export function DailyAbyssal() {
  const server: string = useSelector<RootState, any>((state) => state.common.server);

  /*
  0. 현재 utc 시간을 가져온다.
  1. 데이터에서 UTC 시간을 가져온다. ex) Asia = 8
  2. 현재 UTC 시간에 기준시간을 더한다.
  3. 더한 UTC 시간이 0~4면 하루를 빼준다.
  */

  const serverTime = new Date();
  serverTime.setUTCHours(serverTime.getUTCHours() + serverTimeInfo[server]);
  const serverDay: string = convertToTextDay(serverTime.getUTCHours() < 4 ? serverTime.getUTCDay() - 1 : serverTime.getUTCDay());
  const imageSize: { width: string; height: string } = { width: '70px', height: '65px' };
  const tooltipoFontSize = '12px';

  const weaponAscesionItemSet = Object.keys(weaponAscesionItemInfo);
  const characterTalentItemSet = Object.keys(characterTalentItemInfo);

  function getTodayAbyssalItems(sets: Array<string>, info: Items): string[] {
    const todayItems: string[] = [];
    sets.forEach((setName) => {
      if (info[setName].day.includes(serverDay)) {
        todayItems.push(setName);
      }
    });
    return todayItems;
  }

  return (
    <Container>
      <FlexWrapper styles={{ width: '100%', small: { flexDirection: 'column' } }}>
        <>{trans(Lang.Daily_Abyssal_MainScreen)}</>
      </FlexWrapper>
      <SetContainer>
        <FlexWrapper styles={{ margin: '0 10px 0 0', flexDirection: 'column', small: { margin: '0' } }}>
          <>
            <SubTitle>{trans(Lang.Daily_Character)}</SubTitle>
            <GridWrapper styles={{ width: '250px', medium: { width: '250px' }, small: { width: '250px' } }}>
              {getTodayAbyssalItems(characterTalentItemSet, characterTalentItemInfo).map((name) => {
                return (
                  <ImageContainer key={name}>
                    <RoundImage src={DailySetImages[name]} styles={imageSize} />
                    <TooltipText styles={{ bottom: '0', fontSize: tooltipoFontSize }}>{trans(Lang[name as KeyLang])}</TooltipText>
                  </ImageContainer>
                );
              })}
            </GridWrapper>
          </>
        </FlexWrapper>
        <FlexWrapper styles={{ flexDirection: 'column', small: { margin: '10px 0 0' } }}>
          <>
            <SubTitle>{trans(Lang.Daily_Weapon)}</SubTitle>
            <GridWrapper styles={{ width: '250px', medium: { width: '250px' }, small: { width: '250px' } }}>
              {getTodayAbyssalItems(weaponAscesionItemSet, weaponAscesionItemInfo).map((name) => {
                return (
                  <ImageContainer key={name}>
                    <RoundImage src={DailySetImages[name]} styles={imageSize} />
                    <TooltipText styles={{ bottom: '0', fontSize: tooltipoFontSize }}>{trans(Lang[name as KeyLang])}</TooltipText>
                  </ImageContainer>
                );
              })}
            </GridWrapper>
          </>
        </FlexWrapper>
      </SetContainer>
    </Container>
  );
}

function convertToTextDay(day: number): string {
  switch (day) {
    case -1:
      return 'Saturday';
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
}
