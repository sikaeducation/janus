import { ReactNode, useEffect, useState } from "react";
import "./ActivityManagerView.scss";
import { useAuth0 } from "@auth0/auth0-react";
import ActivityIcon from "../../components/ui/ActivityIcon";
import ModalView from "../ModalView";
import NewActivityForm from "../NewActivityForm";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import Icon from "../../components/ui/Icon";
import { fields, skeletonRows } from "./table";

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

type FormattedActivity = Activity & {
  id: string;
  type: NonNullable<ReactNode>;
  publishedIcon?: ReactNode;
};

export default function ActivityManagerView() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [newActivityOpen, setNewActivityOpen] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const activitiesCount = activities.length;

  const formattedActivities: FormattedActivity[] = activities.map(
    (activity) => {
      return {
        ...activity,
        id: activity._id || "",
        type: activityTypes[activity._type],
        publishedIcon: activity.published ? <Icon type="checkmark" /> : null,
      };
    }
  );

  useEffect(() => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
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
        <Heading level={1} margin={false}>
          Activities{" "}
          <span className="activities-count">({activitiesCount})</span>
        </Heading>
        <Button type="primary" action={handleNewClick}>
          New
        </Button>
      </header>
      {loading ? (
        <DataTable<FormattedActivity>
          fields={fields}
          tableData={skeletonRows}
        />
      ) : (
        <DataTable<FormattedActivity>
          fields={fields}
          tableData={formattedActivities}
        />
      )}
    </div>
  );
}
