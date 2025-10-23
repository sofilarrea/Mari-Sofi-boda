const PUBLIC_KEY  = "9hkNO9AX2_ckTsIxO";
const SERVICE_ID  = "service_zy2z9au";
const TEMPLATE_ID = "template_qpb8os5";

document.addEventListener("DOMContentLoaded", () => {
  emailjs.init(PUBLIC_KEY);

  const form     = document.querySelector("#rsvp-form");
  const statusEl = document.querySelector("#form-status");

  // --- Mostrar/ocultar restricciones
  const dietOptions = document.querySelector("#diet-options");
  const otrosCheck  = document.querySelector("#diet-otros");
  const otrosInput  = document.querySelector("#diet-otros-text");

  document.querySelectorAll("input[name='restricciones_toggle']").forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "Sí") {
        dietOptions.hidden = false;
      } else {
        dietOptions.hidden = true;
        otrosInput.hidden = true;
        otrosInput.value = "";
        otrosCheck.checked = false;
      }
    });
  });

  otrosCheck?.addEventListener("change", () => {
    otrosInput.hidden = !otrosCheck.checked;
    if (!otrosCheck.checked) otrosInput.value = "";
  });

  // --- Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      asistira: form.querySelector('input[name="asistira"]:checked')?.value || "",
      cantidad_personas: form.cantidad_personas?.value || "",
      lleva_ninos: form.querySelector('input[name="lleva_ninos"]:checked')?.value || "",
      transporte: form.querySelector('input[name="transporte"]:checked')?.value || "",
      restricciones: Array.from(form.querySelectorAll('input[name="restricciones[]"]:checked')).map(i => i.value).join(", "),
      otros: otrosCheck?.checked ? (otrosInput?.value.trim() || "Otros (sin especificar)") : ""
    };

    if (!data.name || !data.email || !data.asistira) {
      statusEl.textContent = "Completá nombre, email y asistencia 🙏";
      statusEl.style.color = "#b00020";
      return;
    }

    try {
      statusEl.textContent = "Enviando...";
      statusEl.style.color = "#444";

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);

      statusEl.textContent = "💌 ¡Confirmación enviada con éxito!";
      statusEl.style.color = "#0a7d32";
      form.reset();
      dietOptions.hidden = true;
      otrosInput.hidden  = true;

    } catch (err) {
      console.error("EmailJS Error:", err);
      statusEl.textContent = "❌ Error al enviar. Revisá configuración.";
      statusEl.style.color = "#b00020";
    }
  });
});
