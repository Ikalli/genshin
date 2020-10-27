import React from 'react';
import styled from 'styled-components';

interface DivProps {
  readonly display?: "flex" | "inline-flex";
  readonly flexDirection?: "inherit" | "-moz-initial" | "initial" | "revert" | "unset" | "column" | "column-reverse" | "row" | "row-reverse" | undefined;
  readonly justifyContent?: string;
  readonly alignItems?: string;
  readonly width?: string;
  readonly margin?: string;
  readonly medium?: {
    readonly flexDirection?: "inherit" | "-moz-initial" | "initial" | "revert" | "unset" | "column" | "column-reverse" | "row" | "row-reverse" | undefined;
    readonly width?: string;
  }
  readonly small?: {
    readonly flexDirection?: "inherit" | "-moz-initial" | "initial" | "revert" | "unset" | "column" | "column-reverse" | "row" | "row-reverse" | undefined;
    readonly width?: string;
  }
}

const FlexDiv = styled.div<DivProps>((props: DivProps) => {
    return {
      display: props.display || "flex",
      flexDirection: props.flexDirection || "row",
      justifyContent: props.justifyContent || "center",
      alignItems: props.alignItems || "center",
      width: props.width || "auto",
      margin: props.margin || "0",
      "@media screen and (max-width: 1380px)": {
        flexDirection: props.medium?.flexDirection || (props.flexDirection || "row"),
        width: props.medium?.width || (props.width || "auto")
      },
      "@media screen and (max-width: 768px)": {
        flexDirection: props.small?.flexDirection || (props.flexDirection || "row"),
        width: props.small?.width || (props.flexDirection || "auto")
      }
    }
  }
)

interface Props {
  children: JSX.Element | string;
  styles?: DivProps
}

export function FlexWrapper(props: Props) {
  return(
    <FlexDiv {...props.styles}>
      {props.children}
    </FlexDiv>
  );
}
