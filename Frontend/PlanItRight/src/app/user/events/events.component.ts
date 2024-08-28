import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class EventsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const navbar = document.getElementById("navbar") as HTMLElement;
    const navbarToggle = navbar.querySelector(".navbar-toggle") as HTMLElement;

    const openMobileNavbar = (): void => {
      navbar.classList.add("opened");
      navbarToggle.setAttribute("aria-expanded", "true");
    }

    const closeMobileNavbar = (): void => {
      navbar.classList.remove("opened");
      navbarToggle.setAttribute("aria-expanded", "false");
    }

    navbarToggle.addEventListener("click", () => {
      if (navbar.classList.contains("opened")) {
        closeMobileNavbar();
      } else {
        openMobileNavbar();
      }
    });

    const navbarMenu = navbar.querySelector("#navbar-menu") as HTMLElement;
    const navbarLinksContainer = navbar.querySelector(".navbar-links") as HTMLElement;

    navbarLinksContainer.addEventListener("click", (clickEvent: MouseEvent) => {
      clickEvent.stopPropagation();
    });

    navbarMenu.addEventListener("click", closeMobileNavbar);

    document
      .getElementById("options")
      ?.querySelectorAll("input[name='navtype']")
      .forEach((option) => {
        option.addEventListener("change", (e) => {
          const target = e.target as HTMLInputElement;
          const navType = target.id.split("-").join(" ");
          navbarMenu.className = navType;
        });
      });
  }
}
