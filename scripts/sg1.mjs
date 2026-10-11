import fs from "node:fs";
import { rowsToBusinesses, getPlace, toWhatsApp } from "./sg-lib.mjs";
const row = JSON.parse(fs.readFileSync("/home/user/work/row.json","utf8"));
const [b] = rowsToBusinesses([row]);
const pl = await getPlace(b);
const phone = b.phone || (pl && pl.place && pl.place.internationalPhoneNumber) || "";
let wa = null; try { wa = phone ? toWhatsApp(phone) : null; } catch (e) {}
const matched = Boolean(pl && pl.matched);
const place = (pl && pl.place) || null;
fs.writeFileSync("/home/user/work/biz.json", JSON.stringify({ b: b, place: place, matched: matched }));
console.log(JSON.stringify({ slug: b.slug, name: b.name, city: b.city, matched: matched, photos: (place && place.photos ? place.photos.length : 0), phone: phone, wa: wa }));
