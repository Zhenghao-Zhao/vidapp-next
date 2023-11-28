import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError, UserResponse } from "@supabase/supabase-js";
import { useEffect, useReducer } from "react";

type Response = {
  user: User | null;
  error: AuthError | null;
  loading: boolean;
}

type Action = {
  type: Result
  payload: UserResponse
}

type Result = "success" | "failure";

const initResponse: Response = {
  user: null,
  error: null,
  loading: true,
}

const reducer = (state: Response, action: Action) => {
  switch (action.type) {
    case "success":
      return {
        ...state,
        user: action.payload.data.user,
        loading: false,
      }
    case "failure":
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      }
    default:
      return initResponse;
  }
}

export default function useFetchUser() {

  const [response, dispatch] = useReducer(reducer, initResponse)

  useEffect(() => {
    async function getUser() {
      const supabase = createClientComponentClient();
      const response = await supabase.auth.getUser();
      if (response.error) {
        dispatch({type: "failure", payload: response})
      } else {
        dispatch({type: "success", payload: response})
      }
    }
    getUser();
  }, [])

  return response;
}