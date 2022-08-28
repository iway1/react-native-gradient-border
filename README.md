# 🤯 Actual Gradient Borders in React Native 🤯
![banner](https://user-images.githubusercontent.com/12774588/187088570-5463dd82-6870-41a1-8b8a-6f6aa8c3f74c.png)
## Features
- Easily create views with gradient borders
- Supports any background (including transparent)
- Uses same style properties as `<View/>`
    - borderWidth, borderRadius, borderLeftWidth, borderTopRightRadius etc.
- Exposes `expo-linear-gradient` props to allow full customization of gradient
- Great typesafety to prevent potential usage issues



## Installation
This module uses `expo-linear-gradient`, which requires `expo` to be installed. 

**If you don't have Expo installed in your project run**
```sh
npx install-expo-modules@latest
```

Install library and required packages:

```sh
yarn add @good-react-native/gradient-border @react-native-masked-view/masked-view expo-linear-gradient
```

Then install pods (iOS):

```sh
cd ios && pod install
```

## Usage
`<GradientBorderView>` works just like a regular view, except it has an additional required prop called `gradientProps`, which are the props that will get passed the `<LinearGradient/>`:
```jsx
<GradientBorderView
    gradientProps={{
        colors: ['red', 'orange']
    }}
    style={{
        borderWidth: 5,
        borderRadius: 5,
        height: 50,
        width: 50,
    }}
/>
```

![Screen Shot 2022-08-28 at 10 34 13 AM](https://user-images.githubusercontent.com/12774588/187088606-53acce3f-41c2-4536-8e18-8f8c4b3506a7.png)

Note we just use the views border styles to control things like border width, border radius, etc.  All border styles are supported (`borderTopWidth`, `borderBottomLeftRadius`, etc).

If you don't pass a border width there will be no gradient border shown.

`colors` is the only required property to pass to `gradientProps`, but there are other props for customizing the gradient. If you want more information on how to modify the gradient itself, [check out Expo's docuementation.](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) (it's good).

### Differences with `<View/>`
#### Absolute positioning
One difference between the `<GradientBorderView/>` and a regular `<View/>` border is that when applying a border to a regular view, any absolute positioned child components will take into account the border width. It doesn't seem like there's any way to mimic this behavior in our `<GradientBorderView/>`, if it's bothering you you'll have to deal with it. For example one solution is to wrap the inner view with an extra `<View/>`:

```jsx
<GradientBorderView
    gradientProps={{
        colors: ['red', 'orange']
    }}
    style={{
        borderWidth: 5,
        borderRadius: 5,
        height: 50,
        width: 50,
    }}
>
    <View
        style={{width: '100%', height: '100%',}}
    >
        <View 
            style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: 5, 
                height: 5,
                color: 'blue',
            }}
        />
    </View>
</GradientBorderView>
```

#### Percentage padding
`<GradientBorderView/>` applies its own padding internally to compensate for the border width. Since that padding is combined with the developers padding, we can't support percentage based padding.

# API Reference
## `GradientBorderView` Props
`<GradientBorderView/>` support all props that `React Native`'s view supports, but uses a modified version of the `style` prop. Specifically, the modified style prop does not accept any of the `borderColor` props, and only accepts `number` padding values.

Additionally, it has the following props:
| **Props**     | **Description**                                                                                                                                                                                                                                                  | **Type**      | **Required** |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|--------------|
| gradientProps | Props to be passed to the `<LinearGradient/>` from [`expo-linear-gradient`](https://docs.expo.dev/versions/latest/sdk/linear-gradient/<br>). <br>Requires at least a `colors` property. Supports all `LinearGradient` props except `style` and `pointerEvents`.  | GradientProps | Yes          |
