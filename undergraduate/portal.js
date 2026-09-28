const portalState = { content: { events: [], iceColdTuesdays: [], galleryImages: [] }, activeTab: "events" };
const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");
const statusNode = document.getElementById("portal-status");

function escapeHtml(value = "") {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function formatDate(value) {
  if (!value) return "Date not set";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}

function setStatus(message, isError = false) {
  statusNode.textContent = message;
  statusNode.style.color = isError ? "#ff9b9b" : "";
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && url !== "/api/admin/login") showLogin();
    throw new Error(payload.error || "The request could not be completed.");
  }
  return payload;
}

function showLogin() {
  loginView.hidden = false;
  dashboardView.hidden = true;
  document.getElementById("portal-logout").hidden = true;
}

function showDashboard() {
  loginView.hidden = true;
  dashboardView.hidden = false;
  document.getElementById("portal-logout").hidden = false;
}

async function loadContent() {
  setStatus("Loading chapter content...");
  portalState.content = await api("/api/admin/content");
  renderAll();
  setStatus("Content is up to date.");
}

function renderAll() {
  renderEvents();
  renderIct();
  renderGallery();
  renderEventOptions();
}

function renderEvents() {
  const node = document.getElementById("event-list");
  const items = portalState.content.events || [];
  node.innerHTML = items.length ? items.map((event) => `
    <button class="content-item" type="button" data-edit-event="${event.id}">
      <span><strong>${escapeHtml(event.title)}</strong><span>${formatDate(event.event_date)} · ${escapeHtml(event.location || "Location not set")}</span></span>
      <em>${event.published ? "Live" : "Draft"}</em>
    </button>`).join("") : '<p class="empty-list">No Supabase events yet. Add the first event to begin managing the public calendar here.</p>';
}

function renderIct() {
  const node = document.getElementById("ict-list");
  const items = portalState.content.iceColdTuesdays || [];
  node.innerHTML = items.length ? items.map((entry) => `
    <button class="content-item" type="button" data-edit-ict="${entry.id}">
      <span><strong>${escapeHtml(entry.title || "Ice Cold Tuesday")}</strong><span>${formatDate(entry.entry_date)}</span></span>
      <em>${entry.published ? "Live" : "Draft"}</em>
    </button>`).join("") : '<p class="empty-list">No Supabase Tuesday entries yet. Add one to connect a Reel to the calendar.</p>';
}

function renderGallery() {
  const node = document.getElementById("gallery-list");
  const items = portalState.content.galleryImages || [];
  node.innerHTML = items.length ? items.map((image) => `
    <button class="content-item" type="button" data-edit-gallery="${image.id}">
      <span><strong>${escapeHtml(image.title || image.category || "Gallery photo")}</strong><span>${escapeHtml(image.caption || formatDate(image.event_date))}</span></span>
      ${image.url ? `<img src="${escapeHtml(image.url)}" alt="" />` : `<em>${image.published ? "Live" : "Draft"}</em>`}
    </button>`).join("") : '<p class="empty-list">No gallery photos are stored in Supabase yet. Run the gallery seed migration or upload a new photo.</p>';
}

function renderEventOptions() {
  const select = document.getElementById("gallery-event-id");
  const current = select.value;
  select.innerHTML = '<option value="">None</option>' + (portalState.content.events || []).map((event) => `<option value="${event.id}">${escapeHtml(event.title)} · ${formatDate(event.event_date)}</option>`).join("");
  select.value = current;
}

function formToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function resetForm(kind) {
  const form = document.getElementById(`${kind}-form`);
  form.reset();
  form.elements.id.value = "";
  if (form.elements.published) form.elements.published.checked = true;
  form.querySelector(`[data-delete="${kind}"]`).hidden = true;
  document.getElementById(`${kind}-form-title`).textContent = kind === "event" ? "Add an event" : kind === "ict" ? "Add a Tuesday" : "Upload gallery photos";
}

function fillForm(kind, item) {
  resetForm(kind);
  const form = document.getElementById(`${kind}-form`);
  Object.entries(item).forEach(([key, value]) => {
    const field = form.elements[key];
    if (!field || field.type === "file") return;
    if (field.type === "checkbox") field.checked = Boolean(value);
    else field.value = value ?? "";
  });
  form.querySelector(`[data-delete="${kind}"]`).hidden = false;
  document.getElementById(`${kind}-form-title`).textContent = kind === "event" ? "Edit event" : kind === "ict" ? "Edit Tuesday" : "Edit gallery photo";
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function uploadFile(file, folder) {
  if (!file || !file.size) return "";
  if (file.size > 20 * 1024 * 1024) throw new Error(`${file.name} is larger than the 20 MB upload limit.`);
  const signed = await api("/api/admin/upload-url", { method: "POST", body: JSON.stringify({ fileName: file.name, contentType: file.type, folder }) });
  const uploadUrl = signed.token && !signed.uploadUrl.includes("token=")
    ? `${signed.uploadUrl}${signed.uploadUrl.includes("?") ? "&" : "?"}token=${encodeURIComponent(signed.token)}`
    : signed.uploadUrl;
  const response = await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": file.type || "application/octet-stream", "x-upsert": "false" }, body: file });
  if (!response.ok) throw new Error(`The file ${file.name} could not be uploaded.`);
  return signed.path;
}

async function saveRecord(resource, id, data) {
  return api("/api/admin/content", { method: id ? "PUT" : "POST", body: JSON.stringify({ resource, id, data }) });
}

async function removeRecord(resource, id) {
  return api("/api/admin/content", { method: "DELETE", body: JSON.stringify({ resource, id }) });
}

function setFormBusy(form, busy) {
  form.querySelectorAll("button,input,select,textarea").forEach((field) => { field.disabled = busy; });
}

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = document.getElementById("login-message");
  message.textContent = "Checking access...";
  try {
    await api("/api/admin/login", { method: "POST", body: JSON.stringify({ password: document.getElementById("portal-password").value }) });
    showDashboard();
    await loadContent();
  } catch (error) {
    message.textContent = error.message;
  }
});

document.getElementById("portal-logout").addEventListener("click", async () => {
  await api("/api/admin/logout", { method: "POST" });
  showLogin();
});

document.querySelector(".portal-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-portal-tab]");
  if (!button) return;
  portalState.activeTab = button.dataset.portalTab;
  document.querySelectorAll("[data-portal-tab]").forEach((tab) => tab.classList.toggle("is-active", tab === button));
  document.querySelectorAll("[data-portal-panel]").forEach((panel) => { panel.hidden = panel.dataset.portalPanel !== portalState.activeTab; panel.classList.toggle("is-active", !panel.hidden); });
});

document.addEventListener("click", (event) => {
  const eventId = event.target.closest("[data-edit-event]")?.dataset.editEvent;
  const ictId = event.target.closest("[data-edit-ict]")?.dataset.editIct;
  const galleryId = event.target.closest("[data-edit-gallery]")?.dataset.editGallery;
  if (eventId) fillForm("event", portalState.content.events.find((item) => item.id === eventId));
  if (ictId) fillForm("ict", portalState.content.iceColdTuesdays.find((item) => item.id === ictId));
  if (galleryId) fillForm("gallery", portalState.content.galleryImages.find((item) => item.id === galleryId));
  const fresh = event.target.closest("[data-new]")?.dataset.new;
  if (fresh) resetForm(fresh);
  const cancel = event.target.closest("[data-cancel]")?.dataset.cancel;
  if (cancel) resetForm(cancel);
});

document.getElementById("event-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = formToObject(form);
  const existing = portalState.content.events.find((item) => item.id === values.id);
  setFormBusy(form, true);
  setStatus("Saving the event...");
  try {
    const flyerPath = await uploadFile(form.elements.flyer.files[0], "events/flyers") || existing?.flyer_path || "";
    const recapFlyerPath = await uploadFile(form.elements.recap_flyer.files[0], "events/recaps") || existing?.recap_flyer_path || "";
    const result = await saveRecord("events", values.id, { ...values, flyer_path: flyerPath, recap_flyer_path: recapFlyerPath, published: form.elements.published.checked });
    const savedId = result.item.id;
    for (const [index, file] of [...form.elements.recap_photos.files].entries()) {
      const storagePath = await uploadFile(file, "gallery/event-recaps");
      await saveRecord("galleryImages", "", { storage_path: storagePath, title: values.title, caption: values.recap, category: "Other", event_date: values.event_date, event_id: savedId, sort_order: index, published: form.elements.published.checked });
    }
    await loadContent();
    resetForm("event");
    setStatus("Event saved. The public calendar will update automatically.");
  } catch (error) { setStatus(error.message, true); }
  finally { setFormBusy(form, false); }
});

document.getElementById("ict-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = formToObject(form);
  const existing = portalState.content.iceColdTuesdays.find((item) => item.id === values.id);
  setFormBusy(form, true);
  setStatus("Saving Ice Cold Tuesday...");
  try {
    const thumbnailPath = await uploadFile(form.elements.thumbnail.files[0], "ice-cold-tuesday") || existing?.thumbnail_path || "";
    await saveRecord("iceColdTuesdays", values.id, { ...values, thumbnail_path: thumbnailPath, published: form.elements.published.checked });
    await loadContent();
    resetForm("ict");
    setStatus("Ice Cold Tuesday saved. That Tuesday is now connected to the calendar entry.");
  } catch (error) { setStatus(error.message, true); }
  finally { setFormBusy(form, false); }
});

document.getElementById("gallery-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = formToObject(form);
  const files = [...form.elements.photos.files];
  if (!values.id && !files.length) return setStatus("Choose at least one photo to upload.", true);
  setFormBusy(form, true);
  setStatus(values.id ? "Saving gallery details..." : `Uploading ${files.length} photo${files.length === 1 ? "" : "s"}...`);
  try {
    if (values.id) {
      const existing = portalState.content.galleryImages.find((item) => item.id === values.id);
      const storagePath = files[0] ? await uploadFile(files[0], "gallery") : existing.storage_path;
      await saveRecord("galleryImages", values.id, { ...values, storage_path: storagePath, published: form.elements.published.checked });
    } else {
      for (const [index, file] of files.entries()) {
        const storagePath = await uploadFile(file, "gallery");
        await saveRecord("galleryImages", "", { ...values, storage_path: storagePath, title: files.length > 1 && values.title ? `${values.title} ${index + 1}` : values.title, sort_order: index, published: form.elements.published.checked });
      }
    }
    await loadContent();
    resetForm("gallery");
    setStatus("Gallery content saved and published to the existing gallery.");
  } catch (error) { setStatus(error.message, true); }
  finally { setFormBusy(form, false); }
});

document.querySelectorAll("[data-delete]").forEach((button) => button.addEventListener("click", async () => {
  const kind = button.dataset.delete;
  const form = document.getElementById(`${kind}-form`);
  const id = form.elements.id.value;
  if (!id || !window.confirm("Delete this item from the chapter website?")) return;
  const resource = kind === "event" ? "events" : kind === "ict" ? "iceColdTuesdays" : "galleryImages";
  try {
    await removeRecord(resource, id);
    await loadContent();
    resetForm(kind);
    setStatus("The item was deleted.");
  } catch (error) { setStatus(error.message, true); }
}));

(async function initializePortal() {
  try {
    const session = await api("/api/admin/session");
    if (session.authenticated) { showDashboard(); await loadContent(); }
    else showLogin();
  } catch { showLogin(); }
})();
