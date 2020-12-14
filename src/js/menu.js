(() => {
    const menuBtnRef = document.querySelector("[data-menu-button]");
    const closeMenuBtn =document.querySelector(".close-button");
    const mobileMenuRef = document.querySelector("[data-menu]");
    const headerContainer = document.querySelector("#header-block");
  
    menuBtnRef.addEventListener("click", () => {
        headerContainer.classList.add("header-block");
      mobileMenuRef.classList.add("is-open");

    });
    closeMenuBtn.addEventListener("click", () => {
        headerContainer.classList.remove("header-block");
        mobileMenuRef.classList.remove("is-open");
      });
  })();

  