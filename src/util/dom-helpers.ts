export const addMountContainer = (mountId: string, appendTo?: HTMLElement) => {
  let element = document.getElementById(mountId);
  if (!element) {
    const parentElement = appendTo || document.body;
    element = document.createElement("div");
    element.setAttribute("id", mountId);
    parentElement.appendChild(element);
  }
  return element;
};
