import { IconFileExport, IconSettings } from "@tabler/icons-react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HomeContext from "util/api/home/home.context";

import { SettingDialog } from "component/Settings/SettingDialog";

import { Import } from "../../Settings/Import";
import { Key } from "../../Settings/Key";
import { SidebarButton } from "../../Sidebar/SidebarButton";
import ChatbarContext from "../Chatbar.context";
import { ClearConversations } from "./ClearConversations";
import { PluginKeys } from "./PluginKeys";
import AuthService from "service/AuthService";

export const ChatbarSettings = () => {
  const { t } = useTranslation("sidebar");
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);

  const {
    state: { apiKey, lightMode, serverSideApiKeyIsSet, serverSidePluginKeysSet, conversations },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,
    handleApiKeyChange,
  } = useContext(ChatbarContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    AuthService.logOut();
    navigate("/login");
  };

  const handleClearChat = () => {
    localStorage.removeItem("selectedConversation");
    localStorage.removeItem("conversationHistory");

    //refresh page
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversations.length > 0 ? (
        <ClearConversations onClearConversations={handleClearConversations} />
      ) : null}

      <Import onImport={handleImportConversations} />

      <SidebarButton
        text={t("Export data")}
        icon={<IconFileExport size={18} />}
        onClick={() => handleExportData()}
      />

      <SidebarButton
        text={t("Settings")}
        icon={<IconSettings size={18} />}
        onClick={() => setIsSettingDialog(true)}
      />

      {!serverSideApiKeyIsSet ? <Key apiKey={apiKey} onApiKeyChange={handleApiKeyChange} /> : null}

      {!serverSidePluginKeysSet ? <PluginKeys /> : null}

      <SettingDialog
        open={isSettingDialogOpen}
        onClose={() => {
          setIsSettingDialog(false);
        }}
      />
      <div
        className="cursor-pointer text-primary-green-200 hover:text-primary-green-100"
        onClick={handleClearChat}
      >
        Clear Data
      </div>
      <div
        className="cursor-pointer text-primary-green-200 hover:text-primary-green-100"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};
