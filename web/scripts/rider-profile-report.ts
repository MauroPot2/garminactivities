import { buildRiderProfile } from "../lib/rider-profile";

const profile = buildRiderProfile(120);

const row = (label: string, values: Array<string | number | undefined>) => {
  console.log(`${label}: ${values.map((value) => value ?? "—").join(" | ")}`);
};

console.log("=== RIDER_PROFILE_REPORT ===");
console.log(`period: ${profile.firstDate?.toISOString() ?? "—"} -> ${profile.lastDate?.toISOString() ?? "—"}`);
console.log(`weight_kg: ${profile.weightKg ?? "—"}`);
console.log(`all_time_archetype: ${profile.allTime.archetype}`);
console.log(`recent_archetype: ${profile.recent.archetype}`);
console.log(`all_time_activities: ${profile.allTime.activityCount}`);
console.log(`recent_activities: ${profile.recent.activityCount}`);
console.log(`all_time_powered_activities: ${profile.allTime.poweredActivityCount}`);
console.log(`recent_powered_activities: ${profile.recent.poweredActivityCount}`);
console.log("-- dimensions recent --");
for (const dimension of profile.recent.dimensions) row(dimension.key, [dimension.score, dimension.evidence]);
console.log("-- dimensions all-time --");
for (const dimension of profile.allTime.dimensions) row(dimension.key, [dimension.score, dimension.evidence]);
console.log("-- power curve --");
for (let index = 0; index < profile.allTime.curve.length; index += 1) {
  const historic = profile.allTime.curve[index];
  const recent = profile.recent.curve[index];
  row(historic.label, [
    `all=${historic.watts ?? "—"}W`,
    `recent=${recent?.watts ?? "—"}W`,
    `recent_wkg=${recent?.wkg?.toFixed(2) ?? "—"}`,
    `best=${historic.date?.toISOString() ?? "—"}`,
    historic.file,
  ]);
}
console.log(`strengths: ${profile.strengths.map((item) => `${item.label}(${item.score})`).join(", ")}`);
console.log(`limiters: ${profile.limiters.map((item) => `${item.label}(${item.score})`).join(", ")}`);
console.log("=== END_RIDER_PROFILE_REPORT ===");
