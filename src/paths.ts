export function homePath() {
  return "/";
}

export function ticketsPath() {
  return "/tickets";
}

export function ticketPath(ticketId: string) {
  return `${ticketsPath()}/${ticketId}`;
}

export function ticketEditPath(ticketId: string) {
  return `${ticketPath(ticketId)}/edit`;
}

export function signUpPath() {
  return "/sign-up";
}

export function signInPath() {
  return "/sign-in";
}

export function passwordForgotPath() {
  return "/password-forgot";
}

export function accountProfilePath() {
  return "/account/profile";
}

export function accountPasswordPath() {
  return "/account/password";
}
