import "./ActivityManagerView.scss";
import { ReactNode, useState } from "react";

import { Button, Heading, Drawer, DataTable, Icon } from "@sikaeducation/ui";
import ModalView from "../ModalView";
import NewActivityForm from "../NewActivityForm";

import { fields, skeletonRows } from "./table";
import {
	useCreateActivityMutation,
	useGetActivitiesQuery,
} from "../../slices/apiSlice";
import ArticleDetail from "../ArticleDetail";

type FormattedActivity = Activity & {
	id: string;
	type: NonNullable<ReactNode>;
	publishedIcon?: ReactNode;
};

const activityTypes = {
	Article: <Icon type="article" />,
};

export default function ActivityManagerView() {
	const { data: activities } = useGetActivitiesQuery();
	const [createActivity] = useCreateActivityMutation();
	const [
		newActivityOpen,
		setNewActivityOpen,
	] = useState(false);
	const [
		selectedActivity,
		setSelectedActivity,
	] = useState<
		Activity | undefined
	>(undefined);
	const activitiesCount = activities?.length || 0;
	const handleNewClick = () => setNewActivityOpen(true);
	const closeModal = () => setNewActivityOpen(false);
	const save = (newActivity: Activity) => {
		createActivity(newActivity);
		setNewActivityOpen(false);
	};

	const fieldActions: Record<string, () => void> = {
		// eslint-disable-next-line no-console
		publishedIcon: () => console.log("toggle publishing"),
		title: (id?: string) => {
			setSelectedActivity(activities?.find((activity) => activity._id === id));
		},
		description: (id?: string) => setSelectedActivity(activities?.find((activity) => activity._id === id)),
	};
	const fieldsWithActions = fields.map((field) => ({
		...field,
		action: fieldActions[field.key],
	}));

	const formattedActivities: FormattedActivity[]
		= activities?.map((activity) => ({
			...activity,
			id: activity._id || "",
			type: activityTypes[activity._type],
			publishedIcon: activity.published ? <Icon type="checkmark" /> : null,
		})) || [];

	return (
		<div className="ActivityManagerView">
			{newActivityOpen && (
				<ModalView close={closeModal}>
					<NewActivityForm save={save} cancel={closeModal} />
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
			<DataTable<FormattedActivity>
				fields={fieldsWithActions}
				tableData={formattedActivities || skeletonRows}
				activeId={selectedActivity?._id}
			/>
			{selectedActivity
				? (
					<Drawer close={() => setSelectedActivity(undefined)}>
						<ArticleDetail activity={selectedActivity as ActivityArticle} />
					</Drawer>
				)
				: null}
		</div>
	);
}
