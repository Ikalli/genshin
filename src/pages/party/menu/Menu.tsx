import React from 'react';
import styled from 'styled-components';

import { SavedPartyList } from './SavedPartyList';
import { SquareTextButton, UnderlineInputText, FlexWrapper, BoxModelWrapper } from 'src/components';
import { Lang, trans } from 'src/resources/languages';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingRight: '8vw',
  marginBottom: '64px',
  '@media screen and (max-width: 768px)': {
    paddingRight: '0',
    justifyContent: 'center'
  }
});

interface Props {}

export function Menu(props: Props) {
  return (
    <Container>
      <>
        <FlexWrapper>
          <>
            <UnderlineInputText
              placeholder={trans(Lang.Party_Save_Text_Placeholder)}
              styles={{
                InputStyle: {
                  height: '39px',
                  border: '1px solid #f1f2f3',
                  borderRadius: '12px 0 0 12px'
                }
              }}
            />
            <BoxModelWrapper styles={{ margin: '0 0 0 -1px' }}>
              <SquareTextButton
                styles={{
                  buttonStyles: {
                    display: 'inline-block',
                    height: '42px',
                    padding: '6px'
                  }
                }}
                onClick={() => {}}
              >
                {trans(Lang.Party_Save_Text)}
              </SquareTextButton>
            </BoxModelWrapper>
          </>
        </FlexWrapper>
        <SavedPartyList />
      </>
    </Container>
  );
}