// src/App.js
import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "./App.css";
import { db } from "./db";

function App() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  useEffect(() => {
    if (mapRef.current) return; // init only once
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [77.5946, 12.9716], // Bangalore
      zoom: 12,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;

    return () => map.remove();
  }, []);

  // Example tile URL list (replace with real tile server URLs or derived tile formula)
  const getDemoTileUrls = () => {
    // Demo: pick a few tiles (z/x/y) near Bangalore — adjust as needed.
    // Replace host/path to match the tile service you use.
    const host = "https://demotiles.maplibre.org/tiles/512/{z}/{x}/{y}.png";
    const z = 12;
    const coords = [
      [77.58, 12.97],
      [77.60, 12.97],
      [77.59, 12.98],
    ];
    // In practice convert lon/lat to tile x,y. For demo we'll construct a few sample z/x/y manually:
    // Here we simply return some known tiles for the demo tile host:
    return [
      "https://demotiles.maplibre.org/tiles/512/12/4095/2731.png",
      "https://demotiles.maplibre.org/tiles/512/12/4096/2731.png",
      "https://demotiles.maplibre.org/tiles/512/12/4095/2732.png",
    ];
  };

  // download function: fetch each tile and store blob in Dexie
  const downloadOfflineRegion = async () => {
    setDownloading(true);
    const urls = getDemoTileUrls();
    setProgress({ done: 0, total: urls.length });

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      try {
        const resp = await fetch(url, { mode: "cors" });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const blob = await resp.blob();
        // store in IndexedDB via Dexie
        await db.tiles.put({ key: url, blob });
        setProgress(p => ({ ...p, done: p.done + 1 }));
      } catch (err) {
        console.error("Tile download failed:", url, err);
      }
    }

    setDownloading(false);
  };

  // helper to list what's stored
  const inspectStoredTiles = async () => {
    const all = await db.tiles.toArray();
    console.log("Stored tiles:", all.map(t => ({ key: t.key, size: t.blob?.size })));
    alert(`Stored tiles: ${all.length} (check console for details)`);
  };

  return (
    <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 8 }}>
        <button onClick={downloadOfflineRegion} disabled={downloading}>
          {downloading ? `Downloading ${progress.done}/${progress.total}` : "Download Offline Region"}
        </button>
        <button onClick={inspectStoredTiles} style={{ marginLeft: 8 }}>
          Inspect Stored Tiles
        </button>
      </div>
      <div ref={mapContainer} id="map" style={{ flex: 1 }} />
    </div>
  );
}

export default App;
