const googleConfig = {
  apiKey: "TU_API_KEY_DE_GOOGLE",
  clientId: "TU_CLIENT_ID.apps.googleusercontent.com",
  calendarId: "primary",
};

const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const scope = "https://www.googleapis.com/auth/calendar.events";

const placeholders = Object.values(googleConfig).some((value) =>
  typeof value === "string" ? value.includes("TU_") : false,
);

let googleAuth;
let gapiReady = false;

window.initGoogleClient = function initGoogleClient() {
  if (placeholders || !window.gapi) {
    console.warn(
      "Configura API key, client ID y calendarId antes de inicializar Google Calendar.",
    );
    return;
  }

  window.gapi.load("client:auth2", async () => {
    try {
      await window.gapi.client.init({
        apiKey: googleConfig.apiKey,
        clientId: googleConfig.clientId,
        discoveryDocs,
        scope,
      });
      googleAuth = window.gapi.auth2.getAuthInstance();
      gapiReady = true;
      console.info("Google API lista.");
    } catch (error) {
      console.error("Error al iniciar Google API", error);
    }
  });
};

const serviceDictionary = {
  "consulta-legal": {
    label: "Consulta legal estratégica",
    duration: 60,
    fee: "180 €",
    team: "Socia legal + Controller",
  },
  "auditoria-fiscal": {
    label: "Auditoría fiscal preventiva",
    duration: 75,
    fee: "240 €",
    team: "Tax lead + CFO fractional",
  },
  "constitucion-compliance": {
    label: "Constitución + compliance",
    duration: 90,
    fee: "320 €",
    team: "Legal partner + Compliance officer",
  },
};

const statusEl = document.getElementById("status");
const summaryEl = document.getElementById("bookingSummary");

const setStatus = (message, state) => {
  if (!statusEl) return;
  statusEl.textContent = message || "";
  if (state) {
    statusEl.dataset.state = state;
  } else {
    delete statusEl.dataset.state;
  }
};

const updateSummary = (serviceKey) => {
  if (!summaryEl) return;
  const fields = summaryEl.querySelectorAll("[data-summary]");
  const serviceData = serviceDictionary[serviceKey];

  fields.forEach((field) => {
    const type = field.dataset.summary;
    if (!serviceData) {
      field.textContent = {
        duracion: "Duración estimada: 60 min",
        equipo: "Equipo asignado: Socio legal + CFO",
        honorarios: "Honorarios: 180 €",
      }[type];
      return;
    }

    if (type === "duracion") {
      field.textContent = `Duración estimada: ${serviceData.duration} min`;
    }
    if (type === "equipo") {
      field.textContent = `Equipo asignado: ${serviceData.team}`;
    }
    if (type === "honorarios") {
      field.innerHTML = `Honorarios: ${serviceData.fee.replace(
        "€",
        "&nbsp;€",
      )}`;
    }
  });
};

const ensureSignedIn = async () => {
  if (!gapiReady || !googleAuth) {
    throw new Error(
      "Google Calendar no está listo. Verifica tu configuración en main.js.",
    );
  }

  if (!googleAuth.isSignedIn.get()) {
    await googleAuth.signIn();
  }

  return googleAuth.currentUser.get().getBasicProfile().getEmail();
};

const createCalendarEvent = async (booking) => {
  const start = new Date(`${booking.date}T${booking.time}:00`);
  const duration =
    serviceDictionary[booking.service]?.duration ?? booking.duration;
  const end = new Date(start.getTime() + duration * 60 * 1000);

  const description = [
    `Servicio: ${serviceDictionary[booking.service]?.label ?? booking.service}`,
    `Nombre: ${booking.fullName}`,
    `Correo: ${booking.email}`,
    booking.phone ? `Teléfono: ${booking.phone}` : null,
    booking.details ? `Contexto: ${booking.details}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const event = {
    summary: `${serviceDictionary[booking.service]?.label ?? "Asesoría"} · ${
      booking.fullName
    }`,
    description,
    location: "Sesión virtual - Google Meet",
    start: {
      dateTime: start.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    attendees: [
      { email: booking.email, displayName: booking.fullName },
      { email: "agenda@lexnumbers.com", displayName: "Team Lex & Numbers" },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
    conferenceData: {
      createRequest: {
        requestId: `lexnumbers-${Date.now()}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  return window.gapi.client.calendar.events.insert({
    calendarId: googleConfig.calendarId,
    resource: event,
    conferenceDataVersion: 1,
  });
};

const handleBookingSubmit = async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);

  const booking = {
    fullName: formData.get("fullName")?.trim(),
    email: formData.get("email")?.trim(),
    phone: formData.get("phone")?.trim(),
    service: formData.get("service"),
    date: formData.get("date"),
    time: formData.get("time"),
    details: formData.get("details")?.trim(),
    duration: 60,
  };

  if (!booking.fullName || !booking.email || !booking.service) {
    setStatus("Completa los campos obligatorios.", "error");
    return;
  }

  const startDate = new Date(`${booking.date}T${booking.time}:00`);
  if (Number.isNaN(startDate.getTime()) || startDate < new Date()) {
    setStatus("Elige una combinación de fecha y hora válida.", "error");
    return;
  }

  if (placeholders) {
    setStatus(
      "Agrega tu API Key, Client ID y Calendar ID en main.js para activar la sincronización.",
      "error",
    );
    return;
  }

  try {
    setStatus("Conectando con Google Calendar...", "info");
    await ensureSignedIn();
    await createCalendarEvent(booking);
    setStatus("Listo. Revisa tu calendario para confirmar la cita.", "success");
    form.reset();
    updateSummary("");
  } catch (error) {
    console.error(error);
    setStatus(
      "No se pudo crear el evento. Revisa los permisos o vuelve a intentarlo.",
      "error",
    );
  }
};

const setMinDate = () => {
  const dateInput = document.getElementById("date");
  if (!dateInput) return;
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  dateInput.min = minDate;
};

const handleSmoothScroll = (selector) => {
  const target = document.querySelector(selector);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth" });
};

const initNavigation = () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  links.addEventListener("click", (event) => {
    if (event.target.matches("a[href^='#']")) {
      event.preventDefault();
      links.classList.remove("open");
      handleSmoothScroll(event.target.getAttribute("href"));
    }
  });
};

const initScrollButtons = () => {
  document.querySelectorAll("[data-scroll]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-scroll");
      handleSmoothScroll(target);
    }),
  );
};

const initBookingForm = () => {
  const form = document.getElementById("bookingForm");
  if (!form) return;
  form.addEventListener("submit", handleBookingSubmit);

  const serviceInput = form.querySelector("#service");
  serviceInput?.addEventListener("change", (event) =>
    updateSummary(event.target.value),
  );
};

const initFooterYear = () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setMinDate();
  initNavigation();
  initScrollButtons();
  initBookingForm();
  initFooterYear();
  updateSummary("");
});
