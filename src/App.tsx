import React, { RefObject, useRef, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { GachaScreen, PartyScreen, MainScreen, Policy, Terms } from 'src/pages';
import { Header, TextBlockButton, FlexWrapper, RoundImage, Footer } from 'src/components';
import { LangaugeSelector } from './LangaugeSelector';
import { trans, Lang, LangCode, getCurrentLanguage } from './resources/languages';
import NotFound from './NotFound';

const MainLogo = styled.div({
  fontSize: '30px',
  cursor: 'pointer',
  padding: '0 20px 0 0',
  width: 'max-content',
  fontWeight: 'bolder',
  margin: '0 0 0 7px',
  '@media screen and (max-width: 768px)': {
    fontSize: '18px',
    margin: '0 0 0 4px'
  }
});

const NavList = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  '@media screen and (max-width: 768px)': {
    display: 'none',
    '&.responsive': {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: '10vh',
      left: '0',
      backgroundColor: '#111',
      textAlign: 'center',
      zIndex: 15
    }
  }
});

const ToggleIcon = styled.div({
  display: 'none',
  fontSize: '30px',
  color: '#f1f2f3',
  '@media screen and (max-width: 768px)': {
    display: 'block'
  }
});

const HeaderNav = styled.div({
  transition: '.2s ease-out',
  '&:hover': {
    textShadow: '0 0 8px #f1f2f3, 0 0 15px #f1f2f3, 0 0 20px #f1f2f3',
    boxShadow: 'inset 0 -2px 0 #f1f2f3'
  },
  '&.selected': {
    boxShadow: 'inset 0 -2px 0 #f1f2f3'
  }
});

function App() {
  const [langCode, setLangCode] = useState<LangCode>(getCurrentLanguage());
  const navList = useRef<HTMLDivElement>(null);
  const gacha = useRef<HTMLDivElement>(null);
  const party = useRef<HTMLDivElement>(null);

  const onToggleClick = () => {
    if (navList.current?.classList.contains('responsive')) {
      navList.current?.classList.remove('responsive');
    } else {
      navList.current?.classList.add('responsive');
    }
  };

  const deleteSelected = () => {
    gacha.current?.classList.remove('selected');
    party.current?.classList.remove('selected');
  };

  const onNavClick = (ref: React.RefObject<HTMLDivElement>) => {
    deleteSelected();
    ref.current && ref.current.classList.add('selected');
    if (window.innerWidth <= 768) {
      onToggleClick();
    }
  };

  return (
    <BrowserRouter>
      <Header>
        <>
          <Link to="/">
            <FlexWrapper>
              <>
                <RoundImage
                  styles={{ width: '50px', height: '50px', small: { width: '40px', height: '40px' } }}
                  src={require('./resources/images/mainscreen/logo.png')}
                />
                <MainLogo onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => deleteSelected()}>
                  {trans(Lang.Main_Logo)}
                </MainLogo>
              </>
            </FlexWrapper>
          </Link>
          <NavList id="nav-list" ref={navList}>
            <FlexWrapper styles={{ justifyContent: 'space-between', width: '100%', small: { flexDirection: 'column' } }}>
              <>
                <FlexWrapper styles={{ small: { flexDirection: 'column', width: '100%' } }}>
                  <>
                    <Link to="/gacha">
                      <HeaderNav ref={gacha}>
                        <TextBlockButton onClick={() => onNavClick(gacha)} styles={{ buttonStyles: { small: { width: '95vw' } } }}>
                          {trans(Lang.Gacha)}
                        </TextBlockButton>
                      </HeaderNav>
                    </Link>
                    <Link to="/party">
                      <HeaderNav ref={party}>
                        <TextBlockButton onClick={() => onNavClick(party)} styles={{ buttonStyles: { small: { width: '95vw' } } }}>
                          {trans(Lang.Party)}
                        </TextBlockButton>
                      </HeaderNav>
                    </Link>
                  </>
                </FlexWrapper>
                <LangaugeSelector
                  defaultValue={langCode}
                  onCallBack={(_langCode: LangCode) => {
                    setLangCode(_langCode);
                  }}
                />
              </>
            </FlexWrapper>
          </NavList>
          <ToggleIcon onClick={() => onToggleClick()}>
            <i className="fas fa-bars"></i>
          </ToggleIcon>
        </>
      </Header>
      <Switch>
        <Route exact path="/" component={MainScreen} />
        <Route path="/gacha" component={GachaScreen} />
        <Route path="/party" component={PartyScreen} />
        <Route path="/policy" component={Policy} />
        <Route path="/terms" component={Terms} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
