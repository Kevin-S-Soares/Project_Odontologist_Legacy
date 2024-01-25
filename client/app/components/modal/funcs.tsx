export const hideModal = () => {
  const node = document.getElementById("modal") as HTMLDivElement;
  if (node.classList.contains("flex")) {
    node.classList.replace("flex", "hidden");
  }
};

export const showModal = () => {
  const node = document.getElementById("modal") as HTMLDivElement;
  if (node.classList.contains("hidden")) {
    node.classList.replace("hidden", "flex");
  }
};

export const setModalMessage = (arg: string) => {
  const node = document.getElementById("modal-message") as HTMLParagraphElement;
  node.innerHTML = arg;
};

export const setModalCallBack = (arg: () => void) => {
  const node = document.getElementById("modal-remove") as HTMLButtonElement;
  node.onclick = arg;
};
