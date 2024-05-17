import { startGuestSession } from "../api/api-config.js";

const startSession = async()=>{
  const session = await startGuestSession();
  const miliseconds = new Date(session.expires_at).getTime();
  localStorage.setItem("expirationTime", JSON.stringify(miliseconds));
  localStorage.setItem("guestSessionId", session.guest_session_id);
  console.log(session);
}

if(localStorage.getItem("expirationTime") < new Date().getTime()){
  startSession();
}