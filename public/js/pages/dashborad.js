const sidebarMenu = document.querySelector(".sidebar__menu");
const sidebarLinks = document.querySelectorAll(".sidebar__menu-link");

export class DashboardDOM {
  static setActiveNavs = function () {
    if (sidebarMenu) {
      sidebarMenu.addEventListener("click", (e) => {
        const clicked = e.target.closest(".sidebar__menu-link");

        // Guard clause
        if (!clicked) return;

        // Remove  the active classes
        sidebarLinks.forEach((link) => link.classList.remove("active"));

        // Active the corresponding link
        clicked.classList.add("active");
      });
    }
  };
}
