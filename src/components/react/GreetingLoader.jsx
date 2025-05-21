import { useState } from "react";

function GreetingLoader() {
  const [greeting, setGreeting] = useState("");

  const loadGreeting = async () => {
    try {
      const response = await fetch("/api/json/greeting.json");
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setGreeting(data.greeting);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flow">
      <button onClick={loadGreeting} className="primary">
        Load Greeting
      </button>
      <div className="grad-wrapper flex" id="greeting">
        {greeting.length > 0 ? <div>{greeting}</div> : undefined}
      </div>
    </div>
  );
}

export default GreetingLoader;
