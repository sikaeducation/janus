import { ReactNode, useState } from "react";
import Icon from "../../components/ui/Icon";
import ModalView from "../ModalView";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import { fields, skeletonRows } from "./table";
import { useGetActivitiesQuery } from "../../slices/apiSlice";
import NewActivityForm from "../NewActivityForm";

import "./ActivityManagerView.scss";

const activityTypes = {
  Article: <Icon type="article" />,
};

type FormattedActivity = Activity & {
  id: string;
  type: NonNullable<ReactNode>;
  publishedIcon?: ReactNode;
};

export default function ActivityManagerView() {
  const { data: activities, isLoading } = useGetActivitiesQuery();
  const [newActivityOpen, setNewActivityOpen] = useState(false);
  const activitiesCount = activities?.length || 0;

  const handleNewClick = () => {
    setNewActivityOpen(true);
  };
  const closeModal = () => {
    setNewActivityOpen(false);
  };
  let tableToDisplay: ReactNode;
  if (!isLoading && activities) {
    const formattedActivities: FormattedActivity[] =
      activities.map((activity) => {
        return {
          ...activity,
          id: activity._id || "",
          type: activityTypes[activity._type],
          publishedIcon: activity.published ? <Icon type="checkmark" /> : null,
        };
      }) || [];
    tableToDisplay = (
      <DataTable<FormattedActivity>
        fields={fields}
        tableData={formattedActivities}
      />
    );
  } else {
    tableToDisplay = (
      <DataTable<FormattedActivity> fields={fields} tableData={skeletonRows} />
    );
  }

  const save = (newActivity: Activity) => {
    // eslint-disable-next-line no-console
    console.log(newActivity);
  };
  const saveAndPublish = (newActivity: Activity) => {
    save({
      ...newActivity,
      published: true,
    });
  };

  return (
    <div className="ActivityManagerView">
      {newActivityOpen && (
        <ModalView close={closeModal}>
          <NewActivityForm
            save={save}
            saveAndPublish={saveAndPublish}
            cancel={closeModal}
          />
        </ModalView>
      )}
      <header>
        <Heading level={2} margin={false}>
          Activities{" "}
          <span className="activities-count">({activitiesCount})</span>
        </Heading>
        <Button type="primary" action={handleNewClick}>
          New
        </Button>
      </header>
      {tableToDisplay}
    </div>
  );
}
