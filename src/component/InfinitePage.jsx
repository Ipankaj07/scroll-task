import React from "react";

import { MyContext } from "../context/PageContext";

function InfinitePage() {
  const { data, loading, more, load } = React.useContext(MyContext);
  const loader = React.useRef(load);
  const observer = React.useRef(
    new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          loader.current();
        }
      },
      {
        rootMargin: "0px 0px 10px 0px"
      },
      { threshold: 0.1 }
    )
  );

  const [element, setElement] = React.useState(null);

  React.useEffect(() => {
    loader.current = load;
  }, [load]);

  React.useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <div className="InfinitePage">
      <ul>
        {data.map((row) => (
          <li key={row} style={{ background: "coral" }}>
            {row}
          </li>
        ))}

        {loading && <li>Loading...</li>}

        {!loading && more && (
          <li ref={setElement} style={{ background: "transparent" }}>
            Loading more...
          </li>
        )}
      </ul>
    </div>
  );
}

export default InfinitePage;
