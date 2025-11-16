import React, { useState, useRef } from "react";
import "./Video.css";
import { useNavigate } from "react-router-dom";

import loginVideo from "../assets/Login.mp4";
import Overview from "../assets/overview.mp4";
import Case from "../assets/Case.mp4";
import Filter from "../assets/add filter.mp4";
import Target from "../assets/target.mp4";
import PII from "../assets/PII.mp4";
import Report from "../assets/Report.mp4";
import User from "../assets/User.mp4";
import Roles from "../assets/roles.mp4";
import Catalogue from "../assets/Catalogue.mp4";
import Header from "../assets/header mapping.mp4";
import Search from "../assets/search criteria.mp4";

import {
  FaFolderOpen,
  FaBullseye,
  FaDatabase,
  FaFileAlt,
  FaUsersCog,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdLogin } from "react-icons/md";

const VideoDashboard = () => {
  const [selectedModule, setSelectedModule] = useState("Login");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [durations, setDurations] = useState({});
  const [progress, setProgress] = useState({});
  const videoRefs = useRef({});
  const navigate = useNavigate();

  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleModuleChange = (module) => {
    Object.values(videoRefs.current).forEach((vid) => vid?.pause());
    setDurations({});
    setProgress({});
    setSelectedModule(module);

    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };


  const videoData = {
    Login: [
      {
        title: "Login Overview",
        description: "Learn how to log in securely and navigate the dashboard.",
        src: loginVideo,
      },
    ],
    "Case Management": [
      {
        title: "Overview of dashboard",
        description: "Detailed explanation of dashboard.",
        src: Overview,
      },
      {
        title: "Case Management",
        description: "Creating and managing cases effectively.",
        src: Case,
      },
      {
        title: "Adding filter",
        description: "How to add and customize filters for your cases.",
        src: Filter,
      },
    ],
    "Target Management": [
      {
        title: "Target Creation",
        description: "How to create and link targets in your investigation.",
        src: Target,
      },
    ],
    "PII Management": [
      {
        title: "PII Overview",
        description: "Understand how PII data is handled and searched.",
        src: PII,
      },
    ],
    "Report Analysis": [
      {
        title: "Report Insights",
        description: "Explore report analytics and visual insights.",
        src: Report,
      },
    ],
    "Admin Panel": [
      {
        title: "User management",
        description: "User management walkthrough.",
        src: User,
      },
      {
        title: "Roles management",
        description: "Manage user roles and permissions.",
        src: Roles,
      },
      {
        title: "Catalogue management",
        description: "Managing the PII and Entity catalogue effectively.",
        src: Catalogue,
      },
      {
        title: "Header mapping",
        description: "Mapping headers for data extraction.",
        src: Header,
      },
    ],
    "Search Criteria": [
      {
        title: "Search Criteria Overview",
        description: "Learn how to define and use search criteria effectively.",
        src: Search,
      },
    ],
  };

  const modules = [
    { name: "Login", icon: <MdLogin /> },
    { name: "Case Management", icon: <FaFolderOpen /> },
    { name: "Target Management", icon: <FaBullseye /> },
    { name: "PII Management", icon: <FaDatabase /> },
    { name: "Report Analysis", icon: <FaFileAlt /> },
    { name: "Admin Panel", icon: <FaUsersCog /> },
    { name: "Search Criteria", icon: <FaSearch /> },
  ];

  return (
    <div className="yt-dashboard">
      <button
        className="yt-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>
      <aside
        className={`yt-sidebar ${isCollapsed ? "collapsed" : ""} ${mobileOpen ? "open" : ""
          }`}
      >
        <ul className="yt-sidebar-list">
          {modules.map((module) => (
            <li
              key={module.name}
              className={`yt-sidebar-item ${selectedModule === module.name ? "active" : ""
                }`}
              onClick={() => handleModuleChange(module.name)}
              title={module.name}
            >
              <span className="yt-icon">{module.icon}</span>

              {!isCollapsed ? (
                <span className="yt-label">{module.name}</span>
              ) : (
                <span className="yt-mini-label">
                  {module.name.split(" ")[0]}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="yt-logout" onClick={handleLogout} title="Logout">
          <FaSignOutAlt className="yt-icon" />
          {!isCollapsed && "Logout"}
        </div>

      </aside>

      <main className={`yt-main ${isCollapsed ? "wide" : ""}`}>
        <div className="yt-video-grid">
          {videoData[selectedModule].map((video, index) => (
            <div className="yt-video-card" key={`${selectedModule}-${index}`}>
              <div className="yt-video-thumb">
                <video
                  key={`${selectedModule}-${video.title}`}
                  ref={(el) => (videoRefs.current[video.title] = el)}
                  className="yt-video-player"
                  controls
                  onLoadedMetadata={(e) => {
                    const duration = e.target.duration;
                    setDurations((prev) => ({
                      ...prev,
                      [video.title]: formatDuration(duration),
                    }));
                  }}
                  onTimeUpdate={(e) => {
                    const current = e.target.currentTime;
                    setProgress((prev) => ({
                      ...prev,
                      [video.title]: formatDuration(current),
                    }));
                  }}
                  // muted
                >
                  <source src={video.src} type="video/mp4" />
                </video>

                <span className="yt-video-duration">
                  {progress[video.title] || durations[video.title] || "0:00"}
                </span>
              </div>

              <h3 className="yt-video-title">{video.title}</h3>
              <p className="yt-video-desc">{video.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VideoDashboard;
