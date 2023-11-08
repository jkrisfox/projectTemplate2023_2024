import { getServerSession } from "next-auth/next"
import { authOptions } from "./authOptions";

const checkLoggedIn = async function() {
  const session = await getServerSession(authOptions);
  return {
    userId: session?.user,
    loggedIn: !!session
  };
}

export { checkLoggedIn };