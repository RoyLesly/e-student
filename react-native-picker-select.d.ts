declare module 'react-native-picker-select' {
    import { Component } from 'react';
    import { StyleProp, TextStyle, ViewStyle } from 'react-native';
  
    interface PickerSelectProps {
      onValueChange: (value: any, index: number) => void;
      items: Array<{ label: string; value: any; key?: string | number }>;
      placeholder?: { label: string; value: any; color?: string };
      value?: any;
      style?: {
        inputIOS?: StyleProp<TextStyle>;
        inputAndroid?: StyleProp<TextStyle>;
        viewContainer?: StyleProp<ViewStyle>;
        placeholder?: StyleProp<TextStyle>;
      };
      useNativeAndroidPickerStyle?: boolean;
      textInputProps?: object;
      Icon?: () => JSX.Element;
      disabled?: boolean;
    }
  
    export default class PickerSelect extends Component<PickerSelectProps> {}
  }
  