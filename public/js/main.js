if (localStorage.getItem("isSmall") === "yes") {
    sidebarId.classList.add("small-sidebars");
  } else {
    sidebarId.classList.add("small-sidebars");
  }
const toggleSidebar = () => {
  if (localStorage.getItem("isSmall") === "yes") {
    localStorage.setItem("isSmall","no");
    sidebarId.classList.remove("small-sidebars");
  } else {
    localStorage.setItem("isSmall","yes");
    sidebarId.classList.add("small-sidebars");
  }
    
  };