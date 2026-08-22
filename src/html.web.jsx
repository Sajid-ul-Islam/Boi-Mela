/*
 * Web specific widgets: Icon + Select.
 * Imports core tags from ./htmlCore and re-exports them directly, plus web widgets.
 */
import React from 'react';
import * as Lucide from 'lucide-react';
import { Div, Span, P, H1, H2, H3, H4, Label, Button, Input, Textarea, Img, Ul, Li, MainEl, HeaderEl, FooterEl, Nav, Section, Table, Tr, Td, Th, Br, Scroll } from './htmlCore';

export const Icon = ({ glyph: Glyph, size = 24, color = '#ffffff', strokeWidth = 2, style }) =>
  <Glyph size={size} color={color} strokeWidth={strokeWidth} style={style} />;

export const Select = ({ value, onChange, options, style, ...rest }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} style={style} {...rest}>
    {(options || []).map((o) => (
      <option key={o.value} value={o.value}>{o.label}</option>
    ))}
  </select>
);

const USED_ICONS = ['AlertCircle', 'ArrowUpDown', 'Bell', 'BellOff', 'BellRing', 'BookOpen', 'Check', 'CheckCircle', 'CheckCircle2', 'ChevronRight', 'Compass', 'Edit3', 'Eye', 'Filter', 'Globe', 'Heart', 'Info', 'Lock', 'LogOut', 'Mail', 'Map', 'MapPin', 'MessageCircle', 'Moon', 'Navigation', 'Phone', 'Plus', 'PlusCircle', 'Search', 'Send', 'Share2', 'ShieldCheck', 'Sparkles', 'Star', 'Store', 'Sun', 'Tag', 'Trash2', 'User', 'UserCheck', 'UserPlus', 'Users', 'Volume2', 'VolumeX', 'X'];
const iconExports = {};
USED_ICONS.forEach((name) => {
  const Glyph = Lucide[name];
  if (Glyph) iconExports[name] = (props) => <Icon glyph={Glyph} {...props} />;
});

export { Div, Span, P, H1, H2, H3, H4, Label, Button, Input, Textarea, Img, Ul, Li, MainEl, HeaderEl, FooterEl, Nav, Section, Table, Tr, Td, Th, Br, Scroll };
export const AlertCircle = iconExports['AlertCircle'];
export const ArrowUpDown = iconExports['ArrowUpDown'];
export const Bell = iconExports['Bell'];
export const BellOff = iconExports['BellOff'];
export const BellRing = iconExports['BellRing'];
export const BookOpen = iconExports['BookOpen'];
export const Check = iconExports['Check'];
export const CheckCircle = iconExports['CheckCircle'];
export const CheckCircle2 = iconExports['CheckCircle2'];
export const ChevronRight = iconExports['ChevronRight'];
export const Compass = iconExports['Compass'];
export const Edit3 = iconExports['Edit3'];
export const Eye = iconExports['Eye'];
export const Filter = iconExports['Filter'];
export const Globe = iconExports['Globe'];
export const Heart = iconExports['Heart'];
export const Info = iconExports['Info'];
export const Lock = iconExports['Lock'];
export const LogOut = iconExports['LogOut'];
export const Mail = iconExports['Mail'];
export const Map = iconExports['Map'];
export const MapPin = iconExports['MapPin'];
export const MessageCircle = iconExports['MessageCircle'];
export const Moon = iconExports['Moon'];
export const Navigation = iconExports['Navigation'];
export const Phone = iconExports['Phone'];
export const Plus = iconExports['Plus'];
export const PlusCircle = iconExports['PlusCircle'];
export const Search = iconExports['Search'];
export const Send = iconExports['Send'];
export const Share2 = iconExports['Share2'];
export const ShieldCheck = iconExports['ShieldCheck'];
export const Sparkles = iconExports['Sparkles'];
export const Star = iconExports['Star'];
export const Store = iconExports['Store'];
export const Sun = iconExports['Sun'];
export const Tag = iconExports['Tag'];
export const Trash2 = iconExports['Trash2'];
export const User = iconExports['User'];
export const UserCheck = iconExports['UserCheck'];
export const UserPlus = iconExports['UserPlus'];
export const Users = iconExports['Users'];
export const Volume2 = iconExports['Volume2'];
export const VolumeX = iconExports['VolumeX'];
export const X = iconExports['X'];
