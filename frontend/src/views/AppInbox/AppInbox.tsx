import { useAuth0 } from "@auth0/auth0-react";
import "./AppInbox.scss";

export default function AppInbox() {
  const { user } = useAuth0();
  const role = (user && user["https://sikaeducation.com/role"]) || "";

  return (
    <div className="AppInbox">
      <h1>Inbox</h1>
      {role === "coach" ? <CoachInbox /> : <LearnerInbox />}
    </div>
  );
}

function CoachInbox() {
  return <div className="CoachInbox">Coach</div>;
}
function LearnerInbox() {
  return <div className="StudentInbox">Student</div>;
}
