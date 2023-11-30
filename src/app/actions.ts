"use server"
import { revalidatePath } from "next/cache";
import { createRouteSupabaseClient } from "./utility/supabase-server";
import { cookies, headers } from "next/headers";
import { redirect } from 'next/navigation'
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function signup(formData: FormData) {
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const supabase = createRouteSupabaseClient();
  const headersList = headers();

  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://${headersList.get('host')}/auth/callback`,
    },
  })

  // redirects to page after submitting sign up
  redirect('http://google.com')
}

export async function login(formData: FormData) {
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signInWithPassword({
    email,
    password,
  })
  revalidatePath('/');
}