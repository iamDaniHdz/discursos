import { useState } from 'react';

import { INITIAL_INVITATION } from '../constants/invitation.constants';
import type { InvitationDraft } from '../models/invitation.types';

export function useInvitationForm() {
  const [form, setForm] = useState<InvitationDraft>(INITIAL_INVITATION);

  const updateField = <K extends keyof InvitationDraft>(
    field: K,
    value: InvitationDraft[K],
  ) => {
    setForm(previous => ({
      ...previous,
      value,
    }));
  };

  return {
    form,
    updateField,
  };
}
