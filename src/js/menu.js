const menuBtnRef = document.querySelector("[data-menu-button]");
const closeMenuBtn = document.querySelector(".close-button");
const backdrop = document.querySelector("[data-header-menu-backdrop]");
const dropDownMenu = document.querySelector("[data-header-drop-down-menu]");
const body = document.querySelector("body");

const onKeyPress = (event) => {
  console.log(event.key);
  if (event.key === 'Escape' && !backdrop.classList.contains('hide')) {
    onCloseMenu();
	}
}

export const onOpenMenu = () => {
  backdrop.classList.remove("visually-hidden");
  dropDownMenu.classList.remove("hide");
  body.addEventListener('keydown', onKeyPress);
};

export const onCloseMenu = () => {
  backdrop.classList.add("visually-hidden");
  dropDownMenu.classList.add("hide");
  body.removeEventListener('keydown', onKeyPress);
};

menuBtnRef.addEventListener("click", onOpenMenu);
closeMenuBtn.addEventListener("click", onCloseMenu);
backdrop.addEventListener('click', onCloseMenu);
