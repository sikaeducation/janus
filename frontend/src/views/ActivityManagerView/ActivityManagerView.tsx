import { useEffect, useState } from "react";
import "./ActivityManagerView.scss";
import { useAuth0 } from "@auth0/auth0-react";
import ActivityIcon from "../../components/ActivityIcon";

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

  return (
    <div className="ActivityManagerView">
      <h1>Activities</h1>
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
