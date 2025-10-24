const PUBLIC_KEY  = "9hkNO9AX2_ckTsIxO";
const SERVICE_ID  = "service_zy2z9au";
const TEMPLATE_ID = "template_qpb8os5";

document.addEventListener("DOMContentLoaded", () => {
  emailjs.init(PUBLIC_KEY);

  const form     = document.querySelector("#rsvp-form");
  const statusEl = document.querySelector("#form-status");

  // === Restricciones alimentarias ===
  const restrRadios = document.querySelectorAll("input[name='restricciones_toggle']");
  const restrText   = document.getElementById("restricciones-text");

  restrRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      restrText.style.display = (radio.value === "Sí") ? "block" : "none";
      if (radio.value === "No") {
        restrText.querySelector("input").value = "";
      }
    });
  });

  // === Evento pre-boda ===
  const partidoRadios = document.querySelectorAll("input[name='preboda_asistencia']");
  const prebodaExtra  = document.getElementById("preboda-extra");

  partidoRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "No" && radio.checked) {
        prebodaExtra.style.display = "block";
      } else {
        prebodaExtra.style.display = "none";
        prebodaExtra.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
      }
    });
  });

  // === Envío con EmailJS ===
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
      restricciones: form.querySelector('input[name="restricciones_toggle"]:checked')?.value || "No",
      restricciones_detalle: restrText.querySelector("input")?.value.trim() || "Ninguna",
      preboda_asistencia: form.querySelector('input[name="preboda_asistencia"]:checked')?.value || "No respondió",
      preboda_evento: form.querySelector('input[name="preboda_evento"]:checked')?.value || "No respondió"
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
      restrText.style.display = "none";
      prebodaExtra.style.display = "none";

    } catch (err) {
      console.error("EmailJS Error:", err);
      statusEl.textContent = "❌ Error al enviar. Revisá configuración.";
      statusEl.style.color = "#b00020";
    }
  });
});
