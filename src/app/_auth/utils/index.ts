import { User } from "@supabase/supabase-js";

export const isExistingAccount = (user: User) => {
  return user.identities === undefined || user.identities.length === 0;
};