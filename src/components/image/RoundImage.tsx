import React from 'react';
import styled from 'styled-components';

export interface Style {
  readonly width?: string;
  readonly height?: string;
  readonly borderRadius?: string;
  readonly boxShadow?: string;
  readonly objectFit?: 'inherit' | 'none' | '-moz-initial' | 'initial' | 'revert' | 'unset' | 'fill' | 'contain' | 'cover' | 'scale-down';
}

const Image = styled.img<Style>((props: Style) => {
  return {
    width: props.width || '100px',
    height: props.height || '100px',
    borderRadius: props.borderRadius || '8px',
    boxShadow: props.boxShadow || 'none',
    objectFit: props.objectFit || 'fill'
  };
});

interface Props {
  src: string | null;
  styles?: Style;
}

export function RoundImage(props: Props) {
  if (props.src === null) {
    return null;
  }
  return <Image {...props.styles} src={props.src} />;
}
