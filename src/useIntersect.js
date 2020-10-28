import {useEffect, useRef, useState} from "react";

export default ({root = null, rootMargin = `0px`, threshold = 1}) => {
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(

      new window.IntersectionObserver(([newentry]) => updateEntry(newentry), {
        root,
        rootMargin,
        threshold
      })
  );

  useEffect(
      () => {
        const {current: currentObserver} = observer;
        currentObserver.disconnect();

        if (node) {
          currentObserver.observe(node);
        }

        return () => currentObserver.disconnect();
      },
      [node]
  );

  return [setNode, entry];
};
