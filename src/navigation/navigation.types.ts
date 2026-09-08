import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export interface InvitationDraft {
  outlineNumber: string;
  topic: string;
  speechDate: string;
  speechTime: string;
  hostCongregation: string;
  speakerName: string;
  speakerCongregation: string;
  speakerContact: string;
}

export type RootStackParamList = {
  Home: undefined;

  InvitationForm: undefined;

  InvitationPreview: {
    invitation: InvitationDraft;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackScreenProps<
  TRouteName extends keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, TRouteName>;