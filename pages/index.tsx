import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");

  const analyze = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>AI Product Studio</h1>

      <input
        placeholder="paste image url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={{ width: 400, marginRight: 10 }}
      />

      <button onClick={analyze}>Analyze</button>

      <pre style={{ marginTop: 20 }}>{result}</pre>
    </div>
  );
}
