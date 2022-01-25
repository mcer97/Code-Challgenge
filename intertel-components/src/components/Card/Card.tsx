import React from "react";
import styles from "./style.module.scss";
import CSS from "csstype";
import {
  CSS_FlexAlignmentTypes,
  CSS_FlexGrowShrinkTypes,
  CSS_Generic,
  CSS_Length,
  NullableType,
  OptionalType,
  ThrowComponentError,
} from "../../helpers";

export interface CardProps {
  /**
   * React default children property.
   */
  children?: React.ReactNode;

  /**
   * CSS Flex Box align-item property value for the container.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
   */
  alignItems?: CSS_FlexAlignmentTypes;

  /**
   * CSS Flex Box justify-content property value for the container.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
   */
  justifyContent?: CSS_FlexAlignmentTypes;

  /**
   * CSS Flex Box flex-grow property value for the container.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
   */
  flexGrow?: CSS_FlexGrowShrinkTypes;

  /**
   * CSS Flex Box flex-shrink property value for the container.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
   */
  flexShrink?: CSS_FlexGrowShrinkTypes;

  /**
   * Elevation level of the component.
   ** Range: [0, Inf)
   ** Default: 1.0
   */
  elevation?: number;

  /**
   * Padding of the container.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/length
   */
  padding?: string | number | CSS_Generic;

  /**
   * Width of the container.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/length
   */
  width?: CSS_Length;

  /**
   * Height of the container.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/length
   */
  height?: CSS_Length;

  /**
   * React reference for the internal container
   */
  containerRef?: React.MutableRefObject<HTMLDivElement>;
}

const CardDefaultStyle: CSS.Properties = {};

/**
 * A card flex based container.
 */
export function Card(props: CardProps): React.ReactElement {
  const containerRef: React.MutableRefObject<NullableType<HTMLDivElement>> =
    React.useRef<NullableType<HTMLDivElement>>(null);

  const elevation: string = React.useMemo(() => {
    const temp: number = props.elevation !== undefined ? props.elevation : 1.0;

    if (temp < 0.0)
      ThrowComponentError(
        "Card",
        "Property 'elevation' can not be lower than 0."
      );

    // TODO:  Change to a more controllable model as this one will currently
    //        break for higher values when the card itself is small.
    return `0 ${0.5 * temp}rem ${2.0 * temp}rem ${
      -1.5 * temp
    }rem hsl(0, 0%, 0%)`;
  }, [props.elevation]);

  const flexGrow: OptionalType<CSS_FlexGrowShrinkTypes> = React.useMemo(() => {
    if (props.flexGrow === undefined) return props.flexGrow;

    if (props.flexGrow < 0.0)
      ThrowComponentError(
        "Card",
        "Property 'flexGrow' can not be lower than 0."
      );

    return props.flexGrow;
  }, [props.flexGrow]);

  const flexShrink: OptionalType<CSS_FlexGrowShrinkTypes> =
    React.useMemo(() => {
      if (props.flexShrink === undefined) return props.flexShrink;

      if (props.flexShrink < 0.0)
        ThrowComponentError(
          "Card",
          "Property 'flexShrink' can not be lower than 0."
        );

      return props.flexShrink;
    }, [props.flexShrink]);

  React.useEffect(() => {
    if (props.containerRef)
      props.containerRef.current = containerRef.current as HTMLDivElement;
  }, [props.containerRef]);

  return (
    <div
      ref={containerRef}
      className={styles.Card}
      style={{
        ...CardDefaultStyle,
        alignItems: props.alignItems,
        justifyContent: props.justifyContent,
        boxShadow: elevation,
        padding: props.padding,
        width: props.width,
        height: props.height,
        flexGrow: flexGrow,
        flexShrink: flexShrink,
      }}
    >
      {props.children}
    </div>
  );
}
