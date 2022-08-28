import React from "react";
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import GradientBorder, { RequiredGradientBorderProps } from "./GradientBorder";
import omit from 'lodash/omit';

type GradientBorderViewProps = Omit<ViewStyle, 'paddingLeft' | 'paddingRight' | "paddingTop" | 'paddingBottom' | 'padding' | 'borderColor' | 'borderLeftColor' | 'borderRightColor' | 'borderTopColor' | 'borderBottomColor'>;

/**
 * A view that applies a gradient border. `gradientProps` is required and can be used to control the gradient (expo-linear-gradient props),
 * and `borderWidth` is required. See 
 * @example
 * <GradientBorderView
 *  borderWidth={80}
 *  gradientProps={{
 *    colors: ['red', 'blue']
 *  }}
 * >
 *  <View style={{width: 100, height: 100}}/>
 * </GradientBorderView>
 */
export default function GradientBorderView({
    gradientProps,
    ...props
}: Omit<ViewProps, 'style'> &
    {
        style?: StyleProp<
            GradientBorderViewProps & 
            {paddingLeft?: number, paddingRight?: number, paddingTop?: number, paddingBottom?: number, padding?: number}
        >
    } &
    RequiredGradientBorderProps
) {
    const styles = StyleSheet.flatten(props.style)
    const userAllPadding = styles.padding?styles.padding:0;
    const compensationAllPadding = styles.borderWidth?styles.borderWidth:0;
    function calcPaddingForSide(paddingName: 'paddingLeft' | 'paddingRight' | "paddingTop" | 'paddingBottom', borderWidthName: 'borderTopWidth' | 'borderBottomWidth' | 'borderLeftWidth' | 'borderRightWidth') {
        const userPadding = typeof styles[paddingName] !== 'undefined' ? styles[paddingName]! : userAllPadding;
        const compensationPadding = typeof styles[borderWidthName] !== 'undefined' ? styles[borderWidthName]! : compensationAllPadding
        return compensationPadding + userPadding;
    }

    if(__DEV__ && !(styles.borderWidth || styles.borderTopWidth || styles.borderLeftWidth || styles.borderRightWidth || styles.borderBottomWidth)) {
        console.warn("No borderWidth was passed in the GradientBorderView style, no border will be shown.")
    }

    return (
        <View
            {...props}
            style={[{
                paddingLeft: calcPaddingForSide('paddingLeft', 'borderLeftWidth'),
                paddingRight: calcPaddingForSide('paddingRight', 'borderRightWidth'),
                paddingBottom: calcPaddingForSide('paddingBottom', 'borderBottomWidth'),
                paddingTop: calcPaddingForSide('paddingTop', 'borderTopWidth'),
            }, omit(styles, ['borderWidth', 'borderTopWidth', 'borderLeftWidth', 'borderRightWidth', 'borderBottomWidth'])]}
        >
            {props.children}
            <GradientBorder
                gradientProps={gradientProps}
                borderRadius={styles.borderRadius}
                borderWidth={styles.borderWidth}
                borderBottomWidth={styles.borderBottomWidth}
                borderRightWidth={styles.borderRightWidth}
                borderLeftWidth={styles.borderLeftWidth}
                borderTopWidth={styles.borderTopWidth}
                borderTopLeftRadius={styles.borderTopLeftRadius}
                borderTopRightRadius={styles.borderTopRightRadius}
                borderBottomRightRadius={styles.borderBottomRightRadius}
                borderBottomLeftRadius={styles.borderBottomLeftRadius}
            />
        </View>
    )
}