const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const bookingForm = document.querySelector("[data-booking-form]");
const formNote = document.querySelector("[data-form-note]");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(bookingForm);
  const arrival = data.get("arrival");
  const departure = data.get("departure");

  if (!arrival || !departure) {
    formNote.textContent = "Please choose your arrival and departure dates.";
    return;
  }

  if (new Date(departure) <= new Date(arrival)) {
    formNote.textContent = "Departure should be after arrival.";
    return;
  }

  formNote.textContent = "Thanks. Your stay request is ready to send to Beaumont Inn.";
});
