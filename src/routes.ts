import { IRouteObj } from "interface/common";
import React from "react";

//base
export const linkBasePath = "/dashboard";

//No Auth Routes
export const linkPageBase = "/";
export const linkPageLogin = "/login";

//links
export const linkAuthRoute = "/console";

//Boilerplate Items: To be deleted
export const linkPageView1 = "/view1";
export const linkPageView2 = "/view2";
export const linkPageView3 = "/view3";
export const linkPageView4 = "/view4";
export const linkPageCart = "/cart";
export const linkPageFormNameCreate = "/formname/create";
export const linkPageFormNameView = "/formname/view/:uid"; //? add this to make it optional
export const linkPageBranchCreate = "/branch/create";
export const linkPageBranchView = "/branch/view/:uid"; //? add this to make it optional
export const linkPageMode = "/mode";

//Home Routes
export const linkHomeBase = "/home";

//Dashboard Routes
export const linkDashboardBase = "/dashboard";

//Chat Routes
export const linkChatBase = "/chat";

//Data Source Routes
export const linkDataSourceBase = "/datasource";
export const linkDataSourceList = linkDataSourceBase + "s";
export const linkDataSourceCreate = linkDataSourceBase + "/create";
export const linkDataSourceAddNew = linkDataSourceBase + "/add-new";
export const linkDataSourceSelectView = linkDataSourceBase + "/view";
export const linkDataSourceSelect = linkDataSourceBase + "/select";

//Project Routes
export const linkProjectBase = "/project";
export const linkProjectList = linkProjectBase + "s";
export const linkProjectCreate = linkProjectBase + "/create";
export const linkProjectCreateMaintain = linkProjectBase + "/view/:uid";
export const linkProjectDashboard = linkProjectBase + "/:uid/dashboard";
export const linkProjectChat = "/chat";
export const linkProjectDatasource = "/data";
export const linkProjectPrompt = "/prompt";
export const linkProjectTeams = linkProjectBase + "/:uid/team";
export const linkProjectReports = linkProjectBase + "/:uid/report";

//Prompt Routes
export const linkPromptBase = "/prompt";

//Teams Routes
export const linkTeamsBase = "/team";

//Reports Routes
export const linkReportsBase = "/report";

//linknames
export const linkNamePageLogin = "Login";
export const linkNamePageView1 = "View1";
export const linkNamePageView2 = "View2";
export const linkNamePageFormAutomation = "FormAutomation";
export const linkNamePageBranch = "Branch";

//imports
//To be deleted
const View1 = React.lazy(() => import("./view/View1/View1"));
const View2 = React.lazy(() => import("./view/View2/View2"));
const View3 = React.lazy(() => import("./view/View3/View3"));
const View4 = React.lazy(() => import("./view/View4/View4"));
const FormAutomation = React.lazy(() => import("./view/PageFormAutomation/PageFormAutomation"));
const Branch = React.lazy(() => import("./view/PageBranch/Branch"));
const PageMode = React.lazy(() => import("./view/PageMode/PageMode"));

//Home Imports
const Home = React.lazy(() => import("./view/home/PageHome"));

//Dashboard Imports
const Dashboard = React.lazy(() => import("./view/dashboard/PageDashboard"));

//Chat Imports
const Chat = React.lazy(() => import("./view/chat/PageChat/PageChat"));

//Data Source Imports
const DatasourceList = React.lazy(() => import("./view/datasource/PageDatasourceList"));
const DataSourceAddNew = React.lazy(() => import("./view/datasource/PageDatasourceAddNew"));
const DataSourceCreate = React.lazy(() => import("./view/datasource/PageDatasourceForm"));
const DataSourceSelect = React.lazy(() => import("./view/datasource/PageDatasourceSelect"));

//Project Imports
const ProjectList = React.lazy(() => import("./view/project/PageProjectList"));
const ProjectCreate = React.lazy(() => import("./view/project/PageCreateProject"));
//Prompt Imports
const Prompt = React.lazy(() => import("./view/chat/PageChat"));

//Prompt Imports
const ProjectData = React.lazy(() => import("./view/project/PageProjectData"));

//Teams Imports
const Team = React.lazy(() => import("./view/team/PageTeam"));

//Reports Imports
const Report = React.lazy(() => import("./view/report/PageReport"));

//routes
const routes: IRouteObj[] = [
  //To be deleted
  {
    path: linkPageView1,
    exact: true,
    name: linkNamePageView1,
    component: View1,
  },
  { path: linkPageView2, name: linkNamePageView2, component: View2 },
  { path: linkPageView3, component: View3 },
  { path: linkPageView4, component: View4 },
  { path: linkPageCart, component: View4 },
  { path: linkPageFormNameCreate, component: FormAutomation },
  { path: linkPageFormNameView, component: FormAutomation },
  { path: linkPageBranchCreate, component: Branch },
  { path: linkPageBranchView, component: Branch },
  { path: linkPageMode, component: PageMode },
  //Home Routes
  { path: linkHomeBase, component: Home },
  //Dashboard Routes
  { path: linkProjectDashboard, component: Dashboard },
  //Chat Routes
  { path: linkChatBase, component: Chat },
  //Data Source Routes
  { path: linkDataSourceList, component: DatasourceList },
  { path: linkDataSourceAddNew, component: DataSourceAddNew },
  { path: linkDataSourceCreate + "/:datasourceKey", component: DataSourceCreate },
  { path: linkDataSourceSelectView + "/:datasourceKey/:uid", component: DataSourceSelect },
  { path: linkDataSourceSelect + "/:datasourceKey", component: DataSourceSelect },
  //Project Routes
  { path: linkProjectList, component: ProjectList },
  { path: linkProjectCreate, component: ProjectCreate },
  { path: linkProjectBase + `/:uid` + linkProjectChat, component: Chat },
  { path: linkProjectBase + `/:uid` + linkProjectDatasource, component: ProjectData },
  //Prompt Routes
  {
    path: linkProjectBase + `/:uid` + linkProjectPrompt,
    component: Prompt,
    props: { isPrompt: true },
  },
  //Teams Routes
  { path: linkProjectTeams, component: Team },
  //Reports Routes
  { path: linkProjectReports, component: Report },
];

export default routes;
