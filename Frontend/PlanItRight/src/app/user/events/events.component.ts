import { Component, AfterViewInit } from '@angular/core';
import { EventPopupComponent } from "../event-popup/event-popup.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventPopupComponent,NgIf],
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

  create_icon:string='/assets/icons8-create-90.png';
  calender_icon:string='/assets/icons8-calender-100.png';
  location_icon:string='/assets/icons8-location-100.png';

  isPopupOpen = false;

  constructor() {}

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

}
