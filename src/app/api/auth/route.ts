import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import { NextResponse } from "next/server";

const supabase = createRouteHandlerClient({cookies});

export function signIn() {

}


export function signUp() {

}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    return NextResponse.json({error});
  } catch (error) {
    return NextResponse.json({error});
  }
}

