import { User as AuthUser } from "lucia";

type Entity = {
  userId: string | null;
};

export function isOwner(
  authUser: AuthUser | null | undefined,
  entity: Entity | null | undefined,
) {
  if (authUser == null || entity == null) {
    return false;
  }

  if (entity.userId == null) {
    return false;
  }

  if (authUser.id !== entity.userId) {
    return false;
  } else {
    return true;
  }
}
