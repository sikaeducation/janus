import { useEffect, useState } from "react";
import "./ActivityManagerView.scss";
import { useAuth0 } from "@auth0/auth0-react";
import ActivityIcon from "../../components/ActivityIcon";
import ModalView from "../ModalView";
import NewActivityForm from "../NewActivityForm";

const getActivities = (token: string) => {
  const url = `${process.env.REACT_APP_ACTIVITY_SERVICE_BASE_URL}/activities`;
  const options = {
    headers: {
      Authorization: token,
    },
  };
  return fetch(url, options).then((response) => response.json());
};

const activityTypes = {
  Article: <ActivityIcon activityType="Article" />,
};

export default function ActivityManagerView() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const activitiesCount = activities.length;
  const [newActivityOpen, setNewActivityOpen] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently({
      audience: process.env.REACT_APP_API_AUTH_URI,
    })
      .then(getActivities)
      .then((response: ActivityResponse) => {
        const activityRows = Object.values(response.activities);
        setActivities(activityRows);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleNewClick = () => {
    setNewActivityOpen(true);
  };
  const closeModal = () => {
    setNewActivityOpen(false);
  };
  const saveNewActivity = (newActivity: ActivityArticle) => {
    getAccessTokenSilently({
      audience: process.env.REACT_APP_API_AUTH_URI,
    })
      .then((token: string) => {
        return fetch(
          `${process.env.REACT_APP_ACTIVITY_SERVICE_BASE_URL}/activities`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(newActivity),
          }
        );
      })
      .then((response) => {
        if (!response.ok)
          response.text().then((text) => {
            throw new Error(text);
          });
        return response.json();
      })
      .then((activity) => {
        setActivities([...activities, activity]);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="ActivityManagerView">
      {newActivityOpen && (
        <ModalView close={closeModal}>
          <NewActivityForm save={saveNewActivity} />
        </ModalView>
      )}
      <header>
        <h1>
          Activities{" "}
          <span className="activities-count">({activitiesCount})</span>
        </h1>
        <button type="button" onClick={handleNewClick}>
          New
        </button>
      </header>
      <div className="data-table" role="grid">
        <div role="row" className="table-row table-headers">
          <span className="type">Type</span>
          <span className="name">Name</span>
          <span className="description">Description</span>
          <span className="published">Published</span>
        </div>
        {activities &&
          activities.map(({ _id, _type, title, description, published }) => (
            <div key={_id} role="row" className="table-row">
              <span>{activityTypes[_type]}</span>
              <span>{title}</span>
              <span>{description}</span>
              <span>{published ? "Yes" : "No"}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
