import React, { useState, useRef } from "react";
import "./Video.css";
import { useNavigate } from "react-router-dom";

//CLOUDINARY VIDEO URLS
const loginVideo = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215687/login_qnkxlv.mp4";
const Overview = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215708/overview_d6q2b4.mp4";
const Case = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215707/Case_b9fayl.mp4";
const CaseAnalysis = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215708/case_analysis_ylqryy.mp4";
const Filter = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215695/add_filter_bj2rob.mp4";
const Target = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215712/target_empmnn.mp4";
const PII = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215696/PII_g8cfzd.mp4";
const Report = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215714/Report_hmpmps.mp4";
const User = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215717/User_xfxkos.mp4";
const Roles = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215717/User_xfxkos.mp4"; 
const Catalogue = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215708/Catalogue_bygfbk.mp4";
const Header = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215702/header_mapping_kquqoy.mp4";
const CreateCriteria = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215708/create_criteria_o1j0vp.mp4";
const GraphAndResource = "https://res.cloudinary.com/dv3runtru/video/upload/v1764215716/graph_and_resource_rucq5u.mp4";

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
        title: "Overview of Dashboard",
        description: "Detailed explanation of dashboard.",
        src: Overview,
      },
      {
        title: "Case Management",
        description: "Creating and managing cases effectively.",
        src: Case,
      },
      {
        title: "Adding Filter",
        description: "How to add and customize filters.",
        src: Filter,
      },
      {
        title: "Case Analysis",
        description: "Analyzing case data and generating insights.",
        src: CaseAnalysis,
      },
    ],
    "Target Management": [
      {
        title: "Target Creation",
        description: "How to create and link targets.",
        src: Target,
      },
    ],
    "PII Management": [
      {
        title: "PII Overview",
        description: "Understand how PII data is handled.",
        src: PII,
      },
    ],
    "Report Analysis": [
      {
        title: "Report Insights",
        description: "Explore report analytics and insights.",
        src: Report,
      },
    ],
    "Admin Panel": [
      {
        title: "User Management",
        description: "User management walkthrough.",
        src: User,
      },
      {
        title: "Roles Management",
        description: "Manage user roles and permissions.",
        src: Roles,
      },
      {
        title: "Catalogue Management",
        description: "Manage PII and Entity catalogue.",
        src: Catalogue,
      },
      {
        title: "Header Mapping",
        description: "Map headers for data extraction.",
        src: Header,
      },
    ],
    "Search Criteria": [
      {
        title: "Search Criteria Overview",
        description: "Learn how to define and create criteria.",
        src: CreateCriteria,
      },
      {
        title: "Graph and Resource Overview",
        description: "Use search criteria effectively.",
        src: GraphAndResource,
      },
    ],
  };

  const modules = [
    { name: "Login", icon: <MdLogin /> },
    { name: "Case Management", icon: <FaFolderOpen /> },
    { name: "Target Management", icon: <FaBullseye /> },
    { name: "PII Management", icon: <FaDatabase /> },
    { name: "Report Analysis", icon: <FaFileAlt /> },
    { name: "Admin", icon: <FaUsersCog /> },
    { name: "Search", icon: <FaSearch /> },
  ];

  return (
    <div className="yt-dashboard">
      <button className="yt-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
        ☰
      </button>

      <aside
        className={`yt-sidebar ${isCollapsed ? "collapsed" : ""} ${mobileOpen ? "open" : ""}`}
      >
        <ul className="yt-sidebar-list">
          {modules.map((m) => (
            <li
              key={m.name}
              className={`yt-sidebar-item ${selectedModule === m.name ? "active" : ""}`}
              onClick={() => handleModuleChange(m.name)}
              title={m.name}
            >
              <span className="yt-icon">{m.icon}</span>

              {!isCollapsed ? (
                <span className="yt-label">{m.name}</span>
              ) : (
                <span className="yt-mini-label">{m.name.split(" ")[0]}</span>
              )}
              {/* <span className="yt-label">{m.name}</span> */}

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
