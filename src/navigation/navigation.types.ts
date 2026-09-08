// src/navigation/navigation.types.ts

import type {NavigatorScreenParams} from '@react-navigation/native';
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

export type HomeStackParamList = {
  Home: undefined;
};

export type DiscoursesStackParamList = {
  Discourses: undefined;

  InvitationForm: undefined;

  InvitationPreview: {
    invitation: InvitationDraft;
  };
};

export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;

  DiscoursesStack: NavigatorScreenParams<DiscoursesStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends BottomTabParamList {}
  }
}

// Home

export type HomeScreenProps =
  NativeStackScreenProps<HomeStackParamList, 'Home'>;

// Discursos

export type DiscoursesScreenProps =
  NativeStackScreenProps<
    DiscoursesStackParamList,
    'Discourses'
  >;

export type InvitationFormScreenProps =
  NativeStackScreenProps<
    DiscoursesStackParamList,
    'InvitationForm'
  >;

export type InvitationPreviewScreenProps =
  NativeStackScreenProps<
    DiscoursesStackParamList,
    'InvitationPreview'
  >;