import React from 'react';
import styled from 'styled-components';

import { Layout } from './Layout';
import { CharacterImages, ElementImages } from 'src/resources/images';
import { FlexWrapper, ItemBadgeBox, RoundImage } from 'src/components';
import { characterInfo } from 'src/resources/data';

const PartyName = styled.div({
  width: '100%',
  fontSize: '20px',
  textAlign: 'left'
});

interface PartyInfo {
  party: Array<string>;
  alter?: {
    [name: string]: Array<string>;
  };
}

interface Props {
  character: string;
}

const INDEX_BEAUTIFY = 1;

export function CharactrerRecommendedParty(props: Props) {
  const recommendedParties = characterInfo[props.character].recommendedParty;

  if (recommendedParties) {
    return (
      <Layout title="Recommended Party">
        <FlexWrapper styles={{ width: '100%', flexDirection: 'column' }}>
          {Object.keys(recommendedParties).map((partyName: string, index: number) => {
            const alterCharacter = recommendedParties[partyName].alter;
            return (
              <FlexWrapper key={partyName} styles={{ flexDirection: 'column', margin: '30px 0 0' }}>
                <PartyName>Recommended Party #{index + INDEX_BEAUTIFY}</PartyName>
                <FlexWrapper>
                  {recommendedParties[partyName].party.map((character) => {
                    return (
                      <ItemBadgeBox
                        key={character}
                        badge={
                          <RoundImage
                            src={ElementImages[characterInfo[character].element]}
                            styles={{
                              width: '25px',
                              height: '25px',
                              small: {
                                width: '25px',
                                height: '25px'
                              }
                            }}
                          />
                        }
                        child={<RoundImage src={CharacterImages[character]} styles={{ width: '80px', height: '80px' }} />}
                        styles={{
                          boxStyles: { margin: '10px' },
                          tooltipStyles: { bottom: '0', fontSize: '13px' }
                        }}
                        hoverInnerColor={'#f1f2f3'}
                        tooltip={character}
                        isActive={false}
                        isHoverdToolTip={true}
                        isToolTipVisible={true}
                        isRankVisible={false}
                        isBadgeVisible={true}
                      />
                    );
                  })}
                </FlexWrapper>
                <>
                  {alterCharacter && (
                    <>
                      <div>Alternatives</div>
                      <FlexWrapper styles={{ flexDirection: 'column', margin: '5px 0 0' }}>
                        {Object.keys(alterCharacter).map((character) => {
                          return (
                            <FlexWrapper key={character} styles={{ margin: '10px 0 0' }}>
                              <>
                                <RoundImage src={CharacterImages[character]} styles={{ width: '50px', height: '50px' }} />
                                &nbsp;→&nbsp;
                                {alterCharacter[character].map((altCharacter) => {
                                  return (
                                    <RoundImage
                                      key={altCharacter}
                                      src={CharacterImages[altCharacter]}
                                      styles={{ width: '50px', height: '50px' }}
                                    />
                                  );
                                })}
                              </>
                            </FlexWrapper>
                          );
                        })}
                      </FlexWrapper>
                    </>
                  )}
                </>
              </FlexWrapper>
            );
          })}
        </FlexWrapper>
      </Layout>
    );
  } else return null;
}
