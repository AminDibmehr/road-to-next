import { redirect } from "next/navigation";
import { signInPath } from "@/paths";
import { getAuth } from "../actions/get-auth";

export async function getAuthOrRedirect() {
  const auth = await getAuth();

  if (auth.user == null) {
    redirect(signInPath());
  }

  return auth;
}
