import "./ActivityManagerView.scss";
import { ReactNode, useState } from "react";

import {
  Button,
  Heading,
  Drawer,
  DataTable,
  Icon,
  StatusMessage,
  TextContent,
  Panel,
} from "@sikaeducation/ui";
import ModalView from "@/views/ModalView";
import NewActivityForm from "@/views/NewActivityForm";

import { fields, skeletonRows } from "./table";
import {
  useCreateArticleMutation,
  useDeleteActivityMutation,
  useGetActivitiesQuery,
} from "@/slices/apiSlice";
import ArticleDetail from "@/views/ArticleDetail";
import type { Activity, Article } from "@/declarations";

type FormattedActivity = Activity & {
  id: string;
  type: NonNullable<ReactNode>;
  publishedIcon?: ReactNode;
};

const activityTypes = {
  article: <Icon type="article" />,
};

export default function ActivityManagerView() {
  const {
    data: activities,
    isLoading,
    isError,
    isSuccess,
  } = useGetActivitiesQuery();
  const [createActivity] = useCreateArticleMutation();
  const [newActivityOpen, setNewActivityOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const activitiesCount = activities?.length || 0;
  const handleNewClick = () => setNewActivityOpen(true);
  const closeModal = () => setNewActivityOpen(false);
  const save = (newActivity: Activity) => {
    createActivity(newActivity as Article);
    setNewActivityOpen(false);
  };

  const fieldActions: Record<string, () => void> = {
    publishedIcon: () => console.log("toggle publishing"),
    title: (id?: string) => {
      setSelectedActivity(activities?.find((activity) => activity._id === id));
    },
    description: (id?: string) => {
      setSelectedActivity(activities?.find((activity) => activity._id === id));
    },
  };
  const fieldsWithActions = fields.map((field) => ({
    ...field,
    action: fieldActions[field.key],
  }));

  const formattedActivities: FormattedActivity[] =
    activities?.map<FormattedActivity>((activity) => ({
      ...activity,
      id: activity._id || "",
      type: activityTypes[activity._type],
      publishedIcon: activity.published ? <Icon type="checkmark" /> : null,
    })) || [];

  const [
    deleteActivity,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
    },
  ] = useDeleteActivityMutation();

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const confirmDeleteActivity = () => {
    setConfirmDeleteOpen(true);
  };
  const deleteAndClose = () => {
    deleteActivity(String(selectedActivity?._id))
      .then(() => {
        setSelectedActivity(undefined);
        setConfirmDeleteOpen(false);
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="ActivityManagerView">
      {isLoading && (
        <>
          <header>
            <Heading level={2} margin={false}>
              Activities
            </Heading>
          </header>
          {skeletonRows}
        </>
      )}
      {isError && <StatusMessage type="network-error" />}
      {isSuccess && (
        <>
          <header>
            <Heading level={2} margin={false}>
              Activities{" "}
              <span className="activities-count">{activitiesCount}</span>
            </Heading>
            <Button type="primary" action={handleNewClick}>
              New
            </Button>
          </header>
          {formattedActivities.length === 0 ? (
            <StatusMessage type="no-data" />
          ) : (
            <DataTable<FormattedActivity>
              fields={fieldsWithActions}
              tableData={formattedActivities}
              activeId={selectedActivity?._id}
            />
          )}
        </>
      )}
      {newActivityOpen && (
        <ModalView onClose={closeModal}>
          <NewActivityForm save={save} cancel={closeModal} />
        </ModalView>
      )}
      {confirmDeleteOpen && (
        <ModalView onClose={closeModal}>
          <Panel height="floating" background="light">
            <TextContent>Are sure you want to delete this?</TextContent>
            <Button type="primary" actionType="failure" action={deleteAndClose}>
              Delete It!
            </Button>
            {isDeleteError && <div className="ErrorBar">&nbsp;</div>}
            {isDeleteSuccess && <div className="SuccessBar">&nbsp;</div>}
            {isDeleteLoading && <div className="LoadingBar">&nbsp;</div>}
          </Panel>
        </ModalView>
      )}
      {selectedActivity && selectedActivity._type === "article" ? (
        <Drawer close={() => setSelectedActivity(undefined)}>
          <ArticleDetail
            activity={selectedActivity as Article}
            setActivity={(activity) =>
              setSelectedActivity(activity as Activity)
            }
            deleteActivity={confirmDeleteActivity}
          />
        </Drawer>
      ) : null}
    </div>
  );
}
