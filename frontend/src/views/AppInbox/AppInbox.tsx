import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import InboxCoach from "../../components/InboxCoach";
import InboxLearner from "../../components/InboxLearner";
import { performanceContext } from "../../contexts/performance";
import "./AppInbox.scss";

export default function AppInbox() {
  const { user } = useAuth0();
  const role = (user && user["https://sikaeducation.com/role"]) || "";
  const { getCurrentPrompt } = useContext(performanceContext);

  useEffect(() => {
    getCurrentPrompt();
  });

  return (
    <div className="AppInbox">
      <h1>Inbox</h1>
      {role === "coach" ? <InboxCoach /> : <InboxLearner />}
    </div>
  );
}
