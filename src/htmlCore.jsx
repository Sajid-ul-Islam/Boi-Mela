/*
 * Cross-platform HTML shim — CORE TAGS.
 *
 * This app was originally written with raw HTML tags (<div>, <button>, <input>...)
 * which only render on the WEB (via react-native-web). On a native Android/iOS
 * build there is no DOM, so those tags crash at launch. This module maps each
 * HTML tag to the correct React Native primitive on native, and to the real HTML
 * tag on web — so components can keep their existing logic untouched.
 *
 * Only React Native *core* primitives are used here (View, Text, Pressable,
 * TextInput, Image, ScrollView) — all of which react-native-web also provides, so
 * this file is safe to bundle on BOTH platforms. Platform-specific widgets
 * (Icon, Select) live in html.native.jsx / html.web.jsx.
 */
import React from 'react';
import { Platform, View, Text, Pressable, TextInput, Image, ScrollView } from 'react-native';

const isWeb = Platform.OS === 'web';

/* ----------------------------- Text-level ----------------------------- */

export const Div = ({ onClick, onPress, style, children, ...rest }) => {
  const handler = onPress || onClick;
  if (isWeb) {
    return <div onClick={handler} style={style} {...rest}>{children}</div>;
  }
  if (handler) {
    return <Pressable onPress={handler} style={style} {...rest}>{children}</Pressable>;
  }
  return <View style={style} {...rest}>{children}</View>;
};

export const Span = ({ onClick, onPress, style, children, ...rest }) => {
  const handler = onPress || onClick;
  if (isWeb) {
    return <span onClick={handler} style={style} {...rest}>{children}</span>;
  }
  if (handler) {
    return <Pressable onPress={handler} style={style} {...rest}>{children}</Pressable>;
  }
  return <Text style={style} {...rest}>{children}</Text>;
};

export const P = ({ style, children, ...rest }) =>
  isWeb ? <p style={style} {...rest}>{children}</p> : <Text style={style} {...rest}>{children}</Text>;

export const H1 = ({ style, children, ...rest }) =>
  isWeb ? <h1 style={style} {...rest}>{children}</h1> : <Text style={style} {...rest}>{children}</Text>;
export const H2 = ({ style, children, ...rest }) =>
  isWeb ? <h2 style={style} {...rest}>{children}</h2> : <Text style={style} {...rest}>{children}</Text>;
export const H3 = ({ style, children, ...rest }) =>
  isWeb ? <h3 style={style} {...rest}>{children}</h3> : <Text style={style} {...rest}>{children}</Text>;
export const H4 = ({ style, children, ...rest }) =>
  isWeb ? <h4 style={style} {...rest}>{children}</h4> : <Text style={style} {...rest}>{children}</Text>;

export const Label = ({ style, children, ...rest }) =>
  isWeb ? <label style={style} {...rest}>{children}</label> : <Text style={style} {...rest}>{children}</Text>;

/* ----------------------------- Interactive ----------------------------- */

export const Button = ({ onClick, onPress, style, children, type, disabled, ...rest }) => {
  const handler = onPress || onClick;
  if (isWeb) {
    return (
      <button type={type || 'button'} onClick={handler} disabled={disabled} style={style} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <Pressable onPress={disabled ? undefined : handler} style={[style, disabled && { opacity: 0.5 }]} {...rest}>
      {children}
    </Pressable>
  );
};

export const Input = ({ onChange, onChangeText, value, style, type, placeholder, ...rest }) => {
  if (isWeb) {
    const webOnChange = onChangeText ? (e) => onChangeText(e.target.value) : onChange;
    return (
      <input
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={webOnChange}
        style={style}
        {...rest}
      />
    );
  }
  return <TextInput value={value} placeholder={placeholder} onChangeText={onChangeText} style={style} {...rest} />;
};

export const Textarea = ({ onChange, onChangeText, value, style, placeholder, rows, ...rest }) => {
  if (isWeb) {
    const webOnChange = onChangeText ? (e) => onChangeText(e.target.value) : onChange;
    return (
      <textarea value={value} placeholder={placeholder} rows={rows} onChange={webOnChange} style={style} {...rest} />
    );
  }
  return <TextInput value={value} placeholder={placeholder} onChangeText={onChangeText} multiline style={style} {...rest} />;
};

/* ----------------------------- Media / lists ----------------------------- */

export const Img = ({ src, style, alt, ...rest }) => {
  if (isWeb) {
    return <img src={src} alt={alt} style={style} {...rest} />;
  }
  return <Image source={typeof src === 'string' ? { uri: src } : src} style={style} {...rest} />;
};

export const Ul = ({ style, children, ...rest }) =>
  isWeb ? <ul style={style} {...rest}>{children}</ul> : <View style={style} {...rest}>{children}</View>;
export const Li = ({ style, children, ...rest }) =>
  isWeb ? <li style={style} {...rest}>{children}</li> : <View style={style} {...rest}>{children}</View>;

/* ----------------------------- Structural ----------------------------- */

export const MainEl = ({ style, children, ...rest }) =>
  isWeb ? <main style={style} {...rest}>{children}</main> : <View style={style} {...rest}>{children}</View>;
export const HeaderEl = ({ style, children, ...rest }) =>
  isWeb ? <header style={style} {...rest}>{children}</header> : <View style={style} {...rest}>{children}</View>;
export const FooterEl = ({ style, children, ...rest }) =>
  isWeb ? <footer style={style} {...rest}>{children}</footer> : <View style={style} {...rest}>{children}</View>;
export const Nav = ({ style, children, ...rest }) =>
  isWeb ? <nav style={style} {...rest}>{children}</nav> : <View style={style} {...rest}>{children}</View>;
export const Section = ({ style, children, ...rest }) =>
  isWeb ? <section style={style} {...rest}>{children}</section> : <View style={style} {...rest}>{children}</View>;

/* Tables: RN has no <table>; emulate with flex Views. */
export const Table = ({ style, children, ...rest }) =>
  isWeb ? <table style={style} {...rest}>{children}</table> : <View style={style} {...rest}>{children}</View>;
export const Tr = ({ style, children, ...rest }) =>
  isWeb ? (
    <tr style={style} {...rest}>{children}</tr>
  ) : (
    <View style={[{ flexDirection: 'row' }, style]} {...rest}>{children}</View>
  );
export const Td = ({ style, children, ...rest }) =>
  isWeb ? <td style={style} {...rest}>{children}</td> : <View style={style} {...rest}>{children}</View>;
export const Th = ({ style, children, ...rest }) =>
  isWeb ? <th style={style} {...rest}>{children}</th> : <View style={style} {...rest}>{children}</View>;

export const Br = ({ ...rest }) =>
  isWeb ? <br {...rest} /> : <View style={{ height: 8 }} {...rest} />;

/* Scroll container (useful for native lists) */
export const Scroll = ({ style, children, ...rest }) =>
  isWeb ? <div style={style} {...rest}>{children}</div> : <ScrollView style={style} {...rest}>{children}</ScrollView>;
