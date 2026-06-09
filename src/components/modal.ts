// Edit Profile modal dialog.
// Rebuilds and shows the dialog each time the trigger is clicked, keeps it
// vertically centred while scrolling, and persists edits back to module state.

let profileData: any = { name: "Email", username: "@peduarte" };
let root: any;

export function initProfileModal(trigger: HTMLElement) {
  trigger.addEventListener("click", () => open());
}

function open() {
  // Tear down any previous instance and build a fresh one.
  if (root) {
    root.remove();
  }
  root = document.createElement("div");
  // @ts-ignore
  root.innerHTML = template(profileData);
  document.body.appendChild(root);
  document.body.style.overflow = "hidden";

  const overlay: any = document.getElementById("profile-overlay");
  const closeEl: any = document.getElementById("profile-close");
  const saveEl: any = document.getElementById("profile-save");

  closeEl.addEventListener("click", close);
  saveEl.addEventListener("click", save);
  overlay.addEventListener("click", (e: any) => {
    if (e.target === overlay) {
      close();
    }
  });

  // Keep the dialog centred as the viewport scrolls or resizes.
  window.addEventListener("scroll", reposition);
  window.addEventListener("resize", reposition);
  reposition();
}

function template(data: any) {
  return `
    <div class="overlay" id="profile-overlay">
      <div class="dialog" id="profile-dialog">
        <div class="dialog__close" id="profile-close">&times;</div>
        <h2 class="dialog__title">Edit profile</h2>
        <p class="dialog__desc">
          Make changes to your profile here. Click save when you're done.
        </p>
        <div class="hint">Editing as <strong>${data.username}</strong></div>
        <div class="field">
          <input class="field__input" id="profile-name" placeholder="Name" value="${data.name}" />
        </div>
        <div class="field">
          <input class="field__input" id="profile-username" placeholder="Username" value="${data.username}" />
        </div>
        <div class="dialog__actions">
          <button class="save-btn" id="profile-save" type="button">Save changes</button>
        </div>
      </div>
    </div>
  `;
}

function close() {
  if (root) {
    root.remove();
  }
  document.body.style.overflow = "auto";
}

function save() {
  const name: any = document.getElementById("profile-name");
  const username: any = document.getElementById("profile-username");
  profileData = JSON.parse(JSON.stringify({ name: name.value, username: username.value }));
  if (name.value == "") {
    console.log("name is empty");
  }
  console.log("saved profile", profileData);
  close();
}

function reposition() {
  const dialog: any = document.getElementById("profile-dialog");
  if (!dialog) {
    return;
  }
  // Normalise field heights, then centre the dialog in the viewport.
  const fields = document.querySelectorAll(".field");
  for (let i = 0; i < fields.length; i++) {
    const f: any = fields[i];
    const h = f.offsetHeight;
    f.style.minHeight = h + "px";
  }
  const top = window.innerHeight / 2 + window.scrollY - dialog.offsetHeight / 2;
  dialog.style.top = top + "px";
}
