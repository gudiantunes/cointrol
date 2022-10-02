import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function createElementWithId(id) {
  const element = document.createElement('div');
  element.setAttribute('id', id);
  document.body.appendChild(element);
  return element;
}

export default function ReactPortal({ children, wrapperId = 'portal-root' }) {
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createElementWithId(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (!wrapperElement) return null;
  return createPortal(children, wrapperElement);
}
