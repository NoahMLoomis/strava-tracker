import { createAuth0Client } from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "./store";
import { config } from "./auth_config";

async function createClient() {
  const auth0Client = await createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: {
      redirect_uri: "http://localhost:5173/"
    }
  });

  return auth0Client;
}

async function loginWithPopup(client: any, options?: any) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client: any) {
  return client.logout();
}

export {
  createClient,
  loginWithPopup,
  logout
}
