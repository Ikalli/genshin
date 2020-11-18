import React, { useState } from 'react';

import { ContentWrapper } from 'src/components';
import { CharacterAscesion } from './CharacterAscesion';
import { CharacterTalent } from './CharacterTalent';
import { CharacterDetailModal } from './modal/CharacterDetailModal';
import { TalentWeeklyBoss } from './TalentWeeklyBoss';

interface Props {}

export function CharacterScreen(props: Props) {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [characterName, setCharacterName] = useState('');

  function onCharacterClick(character: string) {
    callbackSetName(character);
    setDetailModalVisible(true);
  }

  function callbackSetName(character: string) {
    setCharacterName(character);
  }

  function onCancelClick() {
    setDetailModalVisible(false);
  }

  return (
    <ContentWrapper>
      <CharacterTalent onClick={onCharacterClick} />
      <TalentWeeklyBoss onClick={onCharacterClick} />
      <CharacterAscesion onClick={onCharacterClick} />
      <>{characterName && <CharacterDetailModal visible={detailModalVisible} cancel={() => onCancelClick()} character={characterName} />}</>
    </ContentWrapper>
  );
}
