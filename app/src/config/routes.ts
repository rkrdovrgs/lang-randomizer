export default [
    //public
    {
        route: "",
        moduleId: "home",
        title: "Activities",
        auth: false,
        name: "home",
        elementId: "home"
    },
    {
        route: "practice-along/:activityId",
        moduleId: "practice-along/practice-along",
        title: "Practice Along",
        auth: false,
        name: "practice-along",
        elementId: "practice-along"
    },

    //admin
    {
        route: ["admin", "admin/activities"],
        moduleId: "admin/activities/activities",
        title: "Activities",
        auth: false,
        name: "admin-activities",
        elementId: "admin-activities"
    },
    {
        route: "admin/activities/add",
        moduleId: "admin/activities/activity-details",
        title: "Activity Details",
        auth: false,
        name: "admin-activity-create",
        elementId: "admin-activity-details"
    },
    {
        route: "admin/activities/:activityId",
        moduleId: "admin/activities/activity-details",
        title: "Activity Details",
        auth: false,
        name: "admin-activity-details",
        elementId: "admin-activity-details"
    }
] as Array<IRoute>;