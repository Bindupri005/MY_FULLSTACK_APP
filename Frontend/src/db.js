// src/db.js
import Dexie from "dexie";

export const db = new Dexie("TravelGuideDB");
db.version(1).stores({
  tiles: "key, blob",       // key = url, blob = ArrayBuffer/Blob
  emergency: "id, data"
});
