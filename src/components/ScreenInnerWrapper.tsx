import React from 'react';
import styled from 'styled-components'

interface Props {
  children: JSX.Element
}

export function ScreenInnerWrapper({ children }: Props){
  const ScreenInnerWrapper = styled.div({
    maxWidth: "1200px",
    margin: "0 auto"
  })

  return (
    <ScreenInnerWrapper>
      {children}
    </ScreenInnerWrapper>
  );
}