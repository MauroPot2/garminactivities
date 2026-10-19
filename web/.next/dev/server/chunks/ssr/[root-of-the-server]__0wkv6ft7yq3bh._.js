module.exports = [
(()=>{"use strict";return[
"[project]/app/coach/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CoachPage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-rsc] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-rsc] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$battery$2d$medium$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BatteryMedium$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/battery-medium.js [app-rsc] (ecmascript) <export default as BatteryMedium>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart-pulse.js [app-rsc] (ecmascript) <export default as HeartPulse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-rsc] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-rsc] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/fit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/format.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$journal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/journal.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/settings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$training$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/training.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
const dynamic = "force-dynamic";
function CoachPage() {
    const activities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivities"])(180);
    const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readSettings"])();
    const currentFtp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentFtp"])(settings);
    const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$training$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildLoadModel"])(activities, settings, 90);
    const journal = new Map((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$journal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getJournalEntries"])().map((entry)=>[
            entry.file,
            entry
        ]));
    const latest = activities[0];
    const latestJournal = latest ? journal.get(latest.file) : undefined;
    const highRpe = (latestJournal?.rpe ?? 0) >= 7;
    const cramps = latestJournal?.cramps === true;
    const highFatigue = model.latest.form < -12;
    const veryFresh = model.latest.form > 12;
    let title = "Endurance controllata";
    let preset = "endurance";
    let duration = "60–90 min";
    let reason = "Il carico recente è gestibile: priorità alla continuità aerobica e alla qualità della pedalata.";
    let intensity = "RPE 2–3 · ritmo conversazionale";
    let workoutHref = `/workouts?preset=${preset}`;
    if (highRpe || cramps) {
        title = "Recupero prima di aggiungere qualità";
        preset = "recovery";
        duration = "45–60 min";
        intensity = "RPE 1–2 · molto facile";
        reason = cramps ? "L'ultima attività è stata annotata con crampi: meglio verificare il recupero muscolare prima di inserire lavori strutturati." : "L'ultima uscita ha RPE elevato: il Coach riduce il carico successivo.";
    } else if (highFatigue) {
        title = "Scarico attivo";
        preset = "recovery";
        duration = "45–60 min";
        intensity = "RPE 1–2";
        reason = "La fatica a breve termine è nettamente superiore alla fitness del modello: conviene assorbire il carico.";
    } else if (veryFresh && model.last7 > 0 && currentFtp) {
        const targetMin = Math.round(currentFtp * .63);
        const targetMax = Math.round(currentFtp * .67);
        title = "2×15' controllato";
        preset = "controlled";
        duration = "circa 60 min";
        intensity = `${targetMin}–${targetMax} W (${Math.round(targetMin / currentFtp * 100)}–${Math.round(targetMax / currentFtp * 100)}% FTP), solo se le sensazioni sono normali`;
        reason = `Il modello mostra buona freschezza. I blocchi sono scalati sulla FTP VeloLab attuale di ${currentFtp} W, senza usare watt fissi.`;
        workoutHref = `/workouts?preset=${preset}&targetMin=${targetMin}&targetMax=${targetMax}`;
    }
    if (!workoutHref.includes(`preset=${preset}`)) workoutHref = `/workouts?preset=${preset}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pageWrap coachPage",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "topbar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "eyebrow",
                            children: "COACH MODE"
                        }, void 0, false, {
                            fileName: "[project]/app/coach/page.tsx",
                            lineNumber: 57,
                            columnNumber: 37
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            children: [
                                "Dati dentro, ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "decisione fuori."
                                }, void 0, false, {
                                    fileName: "[project]/app/coach/page.tsx",
                                    lineNumber: 57,
                                    columnNumber: 95
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/coach/page.tsx",
                            lineNumber: 57,
                            columnNumber: 78
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Coach locale e trasparente: usa FIT, carico, FTP storica e Ride Journal. Non sostituisce una valutazione medica e non interpreta sintomi importanti."
                        }, void 0, false, {
                            fileName: "[project]/app/coach/page.tsx",
                            lineNumber: 57,
                            columnNumber: 129
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/coach/page.tsx",
                    lineNumber: 57,
                    columnNumber: 32
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/coach/page.tsx",
                lineNumber: 57,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "coachHero panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "coachOrb",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            size: 30
                        }, void 0, false, {
                            fileName: "[project]/app/coach/page.tsx",
                            lineNumber: 60,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/coach/page.tsx",
                        lineNumber: 60,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "coachHeroCopy",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sectionLabel",
                                children: "PROSSIMA SEDUTA SUGGERITA"
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 61,
                                columnNumber: 38
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 61,
                                columnNumber: 101
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: reason
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 61,
                                columnNumber: 117
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "coachTags",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/coach/page.tsx",
                                                lineNumber: 61,
                                                columnNumber: 165
                                            }, this),
                                            duration
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 61,
                                        columnNumber: 159
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/coach/page.tsx",
                                                lineNumber: 61,
                                                columnNumber: 209
                                            }, this),
                                            intensity
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 61,
                                        columnNumber: 203
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 61,
                                columnNumber: 132
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/coach/page.tsx",
                        lineNumber: 61,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        className: "primaryButton coachCta",
                        href: workoutHref,
                        children: [
                            "Apri nel Workout Studio",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 62,
                                columnNumber: 90
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/coach/page.tsx",
                        lineNumber: 62,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/coach/page.tsx",
                lineNumber: 59,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "coachSignals",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel coachSignal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$battery$2d$medium$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BatteryMedium$3e$__["BatteryMedium"], {}, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 66,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Form"
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 66,
                                columnNumber: 58
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    model.latest.form > 0 ? "+" : "",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(model.latest.form, 1)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 66,
                                columnNumber: 75
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: "CTL − ATL"
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 66,
                                columnNumber: 155
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/coach/page.tsx",
                        lineNumber: 66,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel coachSignal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {}, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 67,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Carico 7 giorni"
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 67,
                                columnNumber: 48
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(model.last7, 0)
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 67,
                                columnNumber: 76
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: "TSS / stima"
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 67,
                                columnNumber: 122
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/coach/page.tsx",
                        lineNumber: 67,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel coachSignal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {}, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 68,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Ultima RPE"
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 68,
                                columnNumber: 53
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    latestJournal?.rpe ?? "—",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: latestJournal?.rpe ? "/10" : ""
                                    }, void 0, false, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 111
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 68,
                                columnNumber: 76
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: latestJournal?.cramps ? "crampi annotati" : "Ride Journal"
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 68,
                                columnNumber: 168
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/coach/page.tsx",
                        lineNumber: 68,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel coachSignal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"], {}, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 69,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Ultima uscita"
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 69,
                                columnNumber: 55
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    latest ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(latest.normalizedPower, 0) : "—",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: latest ? " W NP" : ""
                                    }, void 0, false, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 144
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 69,
                                columnNumber: 81
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: latest ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatDate"])(latest.date) : "nessuna attività"
                            }, void 0, false, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 69,
                                columnNumber: 191
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/coach/page.tsx",
                        lineNumber: 69,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/coach/page.tsx",
                lineNumber: 65,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "panel coachLogic",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panelHeader",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sectionLabel",
                                    children: "PERCHÉ"
                                }, void 0, false, {
                                    fileName: "[project]/app/coach/page.tsx",
                                    lineNumber: 72,
                                    columnNumber: 77
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "Logica visibile, non una scatola nera"
                                }, void 0, false, {
                                    fileName: "[project]/app/coach/page.tsx",
                                    lineNumber: 72,
                                    columnNumber: 121
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/coach/page.tsx",
                            lineNumber: 72,
                            columnNumber: 72
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/coach/page.tsx",
                        lineNumber: 72,
                        columnNumber: 43
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "coachLogicGrid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "1"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 216
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Controllo RPE e note del Ride Journal"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 224
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 72,
                                columnNumber: 211
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "2"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 285
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Confronto fatigue ATL con fitness CTL"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 293
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 72,
                                columnNumber: 280
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 354
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Uso la FTP valida alla data, se impostata"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 362
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 72,
                                columnNumber: 349
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 427
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Scelgo un carico conservativo e modificabile"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coach/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 435
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coach/page.tsx",
                                lineNumber: 72,
                                columnNumber: 422
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/coach/page.tsx",
                        lineNumber: 72,
                        columnNumber: 179
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/coach/page.tsx",
                lineNumber: 72,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/coach/page.tsx",
        lineNumber: 56,
        columnNumber: 10
    }, this);
}
}),
"[project]/lib/fit.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getActivities",
    ()=>getActivities,
    "getActivity",
    ()=>getActivity,
    "getDashboardStats",
    ()=>getDashboardStats,
    "listActivityFiles",
    ()=>listActivityFiles
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$garmin$2f$fitsdk$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@garmin/fitsdk/src/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$garmin$2f$fitsdk$2f$src$2f$decoder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Decoder$3e$__ = __turbopack_context__.i("[project]/node_modules/@garmin/fitsdk/src/decoder.js [app-rsc] (ecmascript) <export default as Decoder>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$garmin$2f$fitsdk$2f$src$2f$stream$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Stream$3e$__ = __turbopack_context__.i("[project]/node_modules/@garmin/fitsdk/src/stream.js [app-rsc] (ecmascript) <export default as Stream>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$garmin$2f$fitsdk$2f$src$2f$profile$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Profile$3e$__ = __turbopack_context__.i("[project]/node_modules/@garmin/fitsdk/src/profile.js [app-rsc] (ecmascript) <export default as Profile>");
;
;
;
const repoRoot = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(process.cwd(), "..");
const EXCLUDED = new Set([
    ".git",
    "web",
    "node_modules"
]);
const MAX_CONTIGUOUS_POWER_GAP_SEC = 10;
function walkFitFiles(dir, depth = 0) {
    if (depth > 3) return [];
    let entries = [];
    try {
        entries = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readdirSync(dir, {
            withFileTypes: true
        });
    } catch  {
        return [];
    }
    return entries.flatMap((entry)=>{
        if (entry.name.startsWith(".") || EXCLUDED.has(entry.name)) return [];
        const full = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, entry.name);
        if (entry.isDirectory()) return walkFitFiles(full, depth + 1);
        return entry.name.toLowerCase().endsWith(".fit") ? [
            full
        ] : [];
    });
}
function filenameTimestamp(file) {
    const name = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].basename(file);
    const match = name.match(/(20\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/);
    if (match) {
        const [, y, mo, d, h, mi, s] = match;
        const parsed = new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}`).getTime();
        if (Number.isFinite(parsed)) return parsed;
    }
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].statSync(file).mtimeMs;
    } catch  {
        return 0;
    }
}
function listActivityFiles() {
    return walkFitFiles(repoRoot).sort((a, b)=>filenameTimestamp(b) - filenameTimestamp(a));
}
function safeNumber(value) {
    return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
function safeString(value) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
    return undefined;
}
function safeNumberArray(value) {
    if (!Array.isArray(value)) return undefined;
    const values = value.filter((item)=>typeof item === "number" && Number.isFinite(item));
    return values.length ? values : undefined;
}
function average(values) {
    return values.length ? values.reduce((sum, value)=>sum + value, 0) / values.length : undefined;
}
function minimum(values) {
    return values.length ? Math.min(...values) : undefined;
}
function maximum(values) {
    return values.length ? Math.max(...values) : undefined;
}
function toDate(value, fallback) {
    if (value instanceof Date) return value;
    if (typeof value === "string" || typeof value === "number") {
        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) return parsed;
    }
    return new Date(filenameTimestamp(fallback));
}
function semicirclesToDegrees(value) {
    const n = safeNumber(value);
    if (n === undefined) return undefined;
    if (Math.abs(n) <= 180) return n;
    return n * (180 / 2147483648);
}
function leftBalanceFromFit(value) {
    const n = safeNumber(value);
    if (n === undefined) return undefined;
    if (n >= 0 && n <= 100) return n;
    const raw = Math.round(n) & 0xff;
    const percentage = raw & 0x7f;
    if (percentage > 100) return undefined;
    return (raw & 0x80) !== 0 ? 100 - percentage : percentage;
}
function buildPowerSeconds(samples) {
    if (!samples.length) return [];
    const result = [];
    let segment = 0;
    samples.forEach((sample, index)=>{
        const next = samples[index + 1];
        const currentTs = sample.timestampMs;
        const nextTs = next?.timestampMs;
        if (currentTs !== undefined && nextTs !== undefined) {
            const gapSec = (nextTs - currentTs) / 1000;
            if (gapSec > 0 && gapSec <= MAX_CONTIGUOUS_POWER_GAP_SEC) {
                const seconds = Math.max(1, Math.round(gapSec));
                for(let second = 0; second < seconds; second += 1)result.push({
                    power: sample.power,
                    segment
                });
                return;
            }
            result.push({
                power: sample.power,
                segment
            });
            if (gapSec <= 0 || gapSec > MAX_CONTIGUOUS_POWER_GAP_SEC) segment += 1;
            return;
        }
        result.push({
            power: sample.power,
            segment
        });
    });
    return result;
}
function estimateNormalizedPowerFromSeries(series) {
    const window = 30;
    if (series.length < window) return undefined;
    let running = 0;
    let start = 0;
    let fourthPowerSum = 0;
    let count = 0;
    for(let end = 0; end < series.length; end += 1){
        if (end > 0 && series[end].segment !== series[end - 1].segment) {
            running = 0;
            start = end;
        }
        running += series[end].power;
        while(end - start + 1 > window){
            running -= series[start].power;
            start += 1;
        }
        if (end - start + 1 === window) {
            const rollingAverage = running / window;
            fourthPowerSum += rollingAverage ** 4;
            count += 1;
        }
    }
    return count ? Math.round((fourthPowerSum / count) ** 0.25) : undefined;
}
function bestAveragePowerFromSeries(series, seconds) {
    if (seconds <= 0 || series.length < seconds) return null;
    let running = 0;
    let start = 0;
    let best = null;
    for(let end = 0; end < series.length; end += 1){
        if (end > 0 && series[end].segment !== series[end - 1].segment) {
            running = 0;
            start = end;
        }
        running += series[end].power;
        while(end - start + 1 > seconds){
            running -= series[start].power;
            start += 1;
        }
        if (end - start + 1 === seconds) {
            const value = running / seconds;
            best = best === null ? value : Math.max(best, value);
        }
    }
    return best === null ? null : Math.round(best);
}
function sensorFromMessage(message) {
    return {
        index: safeNumber(message.deviceIndex),
        name: safeString(message.productName) ?? safeString(message.descriptor),
        descriptor: safeString(message.descriptor),
        manufacturer: safeString(message.manufacturer),
        product: safeString(message.garminProduct) ?? safeString(message.product),
        deviceType: safeString(message.deviceType),
        sourceType: safeString(message.sourceType),
        serialNumber: safeString(message.serialNumber),
        softwareVersion: safeNumber(message.softwareVersion),
        batteryVoltage: safeNumber(message.batteryVoltage),
        batteryStatus: safeString(message.batteryStatus),
        sensorPosition: safeString(message.sensorPosition)
    };
}
function uniqueSensors(devices) {
    const seen = new Set();
    const result = [];
    devices.map(sensorFromMessage).forEach((sensor)=>{
        const key = [
            sensor.index,
            sensor.serialNumber,
            sensor.product,
            sensor.name,
            sensor.deviceType
        ].join("|");
        if (seen.has(key)) return;
        seen.add(key);
        result.push(sensor);
    });
    return result;
}
function decodeFit(fullPath, includeRecords) {
    const buffer = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(fullPath);
    const stream = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$garmin$2f$fitsdk$2f$src$2f$stream$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Stream$3e$__["Stream"].fromBuffer(buffer);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$garmin$2f$fitsdk$2f$src$2f$decoder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Decoder$3e$__["Decoder"].isFIT(stream)) throw new Error(`File FIT non valido: ${__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].basename(fullPath)}`);
    const decoder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$garmin$2f$fitsdk$2f$src$2f$decoder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Decoder$3e$__["Decoder"](stream);
    const sessions = [];
    const records = [];
    const devices = [];
    const powerSamples = [];
    const positiveCadenceSamples = [];
    const altitudeSamples = [];
    const temperatureSamples = [];
    const respirationSamples = [];
    const { errors } = decoder.read({
        mergeHeartRates: true,
        mesgListener: (messageNumber, message)=>{
            const name = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$garmin$2f$fitsdk$2f$src$2f$profile$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Profile$3e$__["Profile"].types.mesgNum[messageNumber];
            if (name === "session") sessions.push(message);
            if (name === "deviceInfo") devices.push(message);
            if (name !== "record") return;
            const timestamp = message.timestamp instanceof Date ? message.timestamp : undefined;
            const power = safeNumber(message.power);
            const cadence = safeNumber(message.cadence);
            const altitude = safeNumber(message.enhancedAltitude) ?? safeNumber(message.altitude);
            const temperature = safeNumber(message.temperature);
            const respirationRate = safeNumber(message.respirationRate);
            if (power !== undefined) powerSamples.push({
                power,
                timestampMs: timestamp?.getTime()
            });
            if (cadence !== undefined && cadence > 0) positiveCadenceSamples.push(cadence);
            if (altitude !== undefined) altitudeSamples.push(altitude);
            if (temperature !== undefined) temperatureSamples.push(temperature);
            if (respirationRate !== undefined) respirationSamples.push(respirationRate);
            if (includeRecords) {
                records.push({
                    timestamp,
                    power,
                    heartRate: safeNumber(message.heartRate),
                    cadence,
                    altitude,
                    speed: safeNumber(message.enhancedSpeed) ?? safeNumber(message.speed),
                    distance: safeNumber(message.distance),
                    lat: semicirclesToDegrees(message.positionLat),
                    lon: semicirclesToDegrees(message.positionLong),
                    grade: safeNumber(message.grade),
                    temperature,
                    respirationRate,
                    leftRightBalance: leftBalanceFromFit(message.leftRightBalance),
                    leftTorqueEffectiveness: safeNumber(message.leftTorqueEffectiveness),
                    rightTorqueEffectiveness: safeNumber(message.rightTorqueEffectiveness),
                    leftPedalSmoothness: safeNumber(message.leftPedalSmoothness),
                    rightPedalSmoothness: safeNumber(message.rightPedalSmoothness),
                    combinedPedalSmoothness: safeNumber(message.combinedPedalSmoothness),
                    leftPco: safeNumber(message.leftPco),
                    rightPco: safeNumber(message.rightPco),
                    leftPowerPhase: safeNumberArray(message.leftPowerPhase),
                    rightPowerPhase: safeNumberArray(message.rightPowerPhase),
                    leftPowerPhasePeak: safeNumberArray(message.leftPowerPhasePeak),
                    rightPowerPhasePeak: safeNumberArray(message.rightPowerPhasePeak)
                });
            }
        }
    });
    if (!sessions.length) {
        const detail = errors.length ? `: ${errors.map(String).join(", ")}` : "";
        throw new Error(`FIT senza sessione attività${detail}`);
    }
    const session = sessions.at(-1);
    const file = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].relative(repoRoot, fullPath);
    const durationSec = safeNumber(session.totalElapsedTime) ?? safeNumber(session.totalTimerTime) ?? 0;
    const timerSec = safeNumber(session.totalTimerTime) ?? durationSec;
    const movingSec = safeNumber(session.totalMovingTime) ?? timerSec;
    const distanceM = safeNumber(session.totalDistance) ?? 0;
    const totalWork = safeNumber(session.totalWork);
    const sensors = uniqueSensors(devices);
    const device = sensors.map((sensor)=>sensor.name ?? sensor.product).filter(Boolean).at(-1);
    const powerSeries = buildPowerSeconds(powerSamples);
    const normalizedPower = safeNumber(session.normalizedPower) ?? estimateNormalizedPowerFromSeries(powerSeries);
    const summary = {
        file,
        date: toDate(session.startTime ?? session.timestamp, fullPath),
        sport: typeof session.sport === "string" ? session.sport : "cycling",
        subSport: typeof session.subSport === "string" ? session.subSport : undefined,
        distanceKm: distanceM / 1000,
        durationSec,
        timerSec,
        movingSec,
        ascentM: safeNumber(session.totalAscent) ?? 0,
        descentM: safeNumber(session.totalDescent),
        minAltitude: safeNumber(session.enhancedMinAltitude) ?? safeNumber(session.minAltitude) ?? minimum(altitudeSamples),
        maxAltitude: safeNumber(session.enhancedMaxAltitude) ?? safeNumber(session.maxAltitude) ?? maximum(altitudeSamples),
        avgSpeed: safeNumber(session.enhancedAvgSpeed) ?? safeNumber(session.avgSpeed),
        maxSpeed: safeNumber(session.enhancedMaxSpeed) ?? safeNumber(session.maxSpeed),
        avgPower: safeNumber(session.avgPower),
        normalizedPower,
        maxPower: safeNumber(session.maxPower),
        avgHr: safeNumber(session.avgHeartRate),
        maxHr: safeNumber(session.maxHeartRate),
        avgCadence: safeNumber(session.avgCadence) ?? average(positiveCadenceSamples),
        maxCadence: safeNumber(session.maxCadence),
        calories: safeNumber(session.totalCalories),
        workKj: totalWork !== undefined ? totalWork / 1000 : undefined,
        trainingStress: safeNumber(session.trainingStressScore),
        intensityFactor: safeNumber(session.intensityFactor),
        thresholdPower: safeNumber(session.thresholdPower),
        aerobicTrainingEffect: safeNumber(session.totalTrainingEffect),
        anaerobicTrainingEffect: safeNumber(session.totalAnaerobicTrainingEffect),
        exerciseLoad: safeNumber(session.exerciseLoad) ?? safeNumber(session.trainingLoad),
        avgTemperature: safeNumber(session.avgTemperature) ?? average(temperatureSamples),
        minTemperature: safeNumber(session.minTemperature) ?? minimum(temperatureSamples),
        maxTemperature: safeNumber(session.maxTemperature) ?? maximum(temperatureSamples),
        avgRespirationRate: safeNumber(session.avgRespirationRate) ?? average(respirationSamples),
        minRespirationRate: safeNumber(session.minRespirationRate) ?? minimum(respirationSamples),
        maxRespirationRate: safeNumber(session.maxRespirationRate) ?? maximum(respirationSamples),
        estimatedSweatLoss: safeNumber(session.estimatedSweatLoss),
        fluidConsumed: safeNumber(session.fluidConsumed) ?? safeNumber(session.totalFluid),
        avgLeftRightBalance: leftBalanceFromFit(session.avgLeftRightBalance),
        avgLeftTorqueEffectiveness: safeNumber(session.avgLeftTorqueEffectiveness),
        avgRightTorqueEffectiveness: safeNumber(session.avgRightTorqueEffectiveness),
        avgLeftPedalSmoothness: safeNumber(session.avgLeftPedalSmoothness),
        avgRightPedalSmoothness: safeNumber(session.avgRightPedalSmoothness),
        avgCombinedPedalSmoothness: safeNumber(session.avgCombinedPedalSmoothness),
        avgLeftPco: safeNumber(session.avgLeftPco),
        avgRightPco: safeNumber(session.avgRightPco),
        avgLeftPowerPhase: safeNumberArray(session.avgLeftPowerPhase),
        avgRightPowerPhase: safeNumberArray(session.avgRightPowerPhase),
        avgLeftPowerPhasePeak: safeNumberArray(session.avgLeftPowerPhasePeak),
        avgRightPowerPhasePeak: safeNumberArray(session.avgRightPowerPhasePeak),
        timeStanding: safeNumber(session.timeStanding),
        standCount: safeNumber(session.standCount),
        avgPowerPosition: safeNumberArray(session.avgPowerPosition),
        maxPowerPosition: safeNumberArray(session.maxPowerPosition),
        avgCadencePosition: safeNumberArray(session.avgCadencePosition),
        maxCadencePosition: safeNumberArray(session.maxCadencePosition),
        device
    };
    const curveDurations = [
        [
            "1s",
            1
        ],
        [
            "5s",
            5
        ],
        [
            "15s",
            15
        ],
        [
            "30s",
            30
        ],
        [
            "1m",
            60
        ],
        [
            "2m",
            120
        ],
        [
            "5m",
            300
        ],
        [
            "10m",
            600
        ],
        [
            "20m",
            1200
        ],
        [
            "30m",
            1800
        ],
        [
            "60m",
            3600
        ]
    ];
    return {
        ...summary,
        records,
        sensors,
        powerCurve: includeRecords ? curveDurations.map(([label, seconds])=>({
                label,
                seconds,
                watts: bestAveragePowerFromSeries(powerSeries, seconds)
            })) : []
    };
}
const summaryCache = new Map();
function ensureContainedFitPath(candidate) {
    if (!candidate.toLowerCase().endsWith(".fit") || !__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(candidate)) throw new Error("Attività non trovata");
    const rootReal = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].realpathSync(repoRoot);
    const candidateReal = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].realpathSync(candidate);
    const relative = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].relative(rootReal, candidateReal);
    const escapesRoot = relative === ".." || relative.startsWith(`..${__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].sep}`) || __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].isAbsolute(relative);
    if (escapesRoot) throw new Error("Attività non trovata");
    return candidateReal;
}
function getActivities(limit = 48) {
    const decoded = listActivityFiles().map((file)=>{
        try {
            const containedFile = ensureContainedFitPath(file);
            const cached = summaryCache.get(containedFile);
            if (cached) return cached;
            const activity = decodeFit(containedFile, false);
            summaryCache.set(containedFile, activity);
            return activity;
        } catch  {
            return null;
        }
    }).filter((activity)=>Boolean(activity));
    decoded.sort((a, b)=>b.date.getTime() - a.date.getTime());
    return decoded.slice(0, Math.max(0, Math.floor(limit)));
}
function resolveContainedFitPath(file) {
    return ensureContainedFitPath(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(repoRoot, file));
}
function getActivity(file) {
    return decodeFit(resolveContainedFitPath(file), true);
}
function getDashboardStats(activities) {
    const now = Date.now();
    const week = activities.filter((activity)=>now - activity.date.getTime() <= 7 * 24 * 3600 * 1000);
    const month = activities.filter((activity)=>now - activity.date.getTime() <= 30 * 24 * 3600 * 1000);
    const sum = (items, key)=>items.reduce((total, item)=>total + (typeof item[key] === "number" ? Number(item[key]) : 0), 0);
    return {
        weekDistance: sum(week, "distanceKm"),
        weekDuration: sum(week, "movingSec"),
        weekAscent: sum(week, "ascentM"),
        weekWork: sum(week, "workKj"),
        monthDistance: sum(month, "distanceKm"),
        ridesThisMonth: month.length
    };
}
}),
"[project]/lib/format.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compact",
    ()=>compact,
    "formatDate",
    ()=>formatDate,
    "formatDuration",
    ()=>formatDuration,
    "formatNumber",
    ()=>formatNumber
]);
function formatDuration(seconds = 0) {
    const total = Math.max(0, Math.round(seconds));
    const h = Math.floor(total / 3600);
    const m = Math.floor(total % 3600 / 60);
    const s = total % 60;
    return h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m ${String(s).padStart(2, "0")}s`;
}
function formatDate(date, withTime = false) {
    return new Intl.DateTimeFormat("it-IT", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        ...withTime ? {
            hour: "2-digit",
            minute: "2-digit"
        } : {}
    }).format(date);
}
function formatNumber(value, digits = 0) {
    if (value === undefined || Number.isNaN(value)) return "—";
    return new Intl.NumberFormat("it-IT", {
        maximumFractionDigits: digits,
        minimumFractionDigits: digits
    }).format(value);
}
function compact(value) {
    if (value === undefined) return "—";
    return new Intl.NumberFormat("it-IT", {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(value);
}
}),
"[project]/lib/journal.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getJournalEntries",
    ()=>getJournalEntries,
    "getJournalEntry",
    ()=>getJournalEntry,
    "saveJournalEntry",
    ()=>saveJournalEntry
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
const localDir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), ".velolab");
const journalPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(localDir, "journal.json");
function readAll() {
    try {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(journalPath)) return {
            entries: {}
        };
        const parsed = JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(journalPath, "utf8"));
        return parsed && parsed.entries ? parsed : {
            entries: {}
        };
    } catch  {
        return {
            entries: {}
        };
    }
}
function cleanNumber(value, min, max) {
    const number = Number(value);
    return Number.isFinite(number) && number >= min && number <= max ? number : undefined;
}
function getJournalEntry(file) {
    return readAll().entries[file];
}
function getJournalEntries() {
    return Object.values(readAll().entries);
}
function saveJournalEntry(input) {
    if (!input.file || input.file.length > 500) throw new Error("Attività non valida");
    const journal = readAll();
    const entry = {
        file: input.file,
        rpe: cleanNumber(input.rpe, 1, 10),
        carbsG: cleanNumber(input.carbsG, 0, 1000),
        fluidsMl: cleanNumber(input.fluidsMl, 0, 10000),
        caffeine: Boolean(input.caffeine),
        cramps: Boolean(input.cramps),
        crampsNote: typeof input.crampsNote === "string" ? input.crampsNote.trim().slice(0, 300) : undefined,
        notes: typeof input.notes === "string" ? input.notes.trim().slice(0, 1500) : undefined,
        updatedAt: new Date().toISOString()
    };
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].mkdirSync(localDir, {
        recursive: true
    });
    journal.entries[input.file] = entry;
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(journalPath, `${JSON.stringify(journal, null, 2)}\n`, "utf8");
    return entry;
}
}),
"[project]/lib/settings.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentFtp",
    ()=>getCurrentFtp,
    "getFtpForDate",
    ()=>getFtpForDate,
    "readSettings",
    ()=>readSettings,
    "writeSettings",
    ()=>writeSettings
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
const localDir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), ".velolab");
const settingsPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(localDir, "settings.json");
const defaults = {
    ftpHistory: []
};
function localDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
function isValidDateKey(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
function cleanSettings(value) {
    const ftpHistory = Array.isArray(value.ftpHistory) ? value.ftpHistory.filter((entry)=>Boolean(entry && isValidDateKey(String(entry.date)) && Number.isFinite(Number(entry.watts)) && Number(entry.watts) >= 50 && Number(entry.watts) <= 600)).map((entry)=>({
            date: entry.date,
            watts: Math.round(Number(entry.watts))
        })).sort((a, b)=>a.date.localeCompare(b.date)) : [];
    const numeric = (input, min, max)=>{
        const number = Number(input);
        return Number.isFinite(number) && number >= min && number <= max ? number : undefined;
    };
    return {
        ftpHistory,
        weightKg: numeric(value.weightKg, 35, 250),
        maxHeartRate: numeric(value.maxHeartRate, 100, 240),
        thresholdHeartRate: numeric(value.thresholdHeartRate, 90, 230)
    };
}
function readSettings() {
    try {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(settingsPath)) return defaults;
        return cleanSettings(JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(settingsPath, "utf8")));
    } catch  {
        return defaults;
    }
}
function writeSettings(settings) {
    const clean = cleanSettings(settings);
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].mkdirSync(localDir, {
        recursive: true
    });
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(settingsPath, `${JSON.stringify(clean, null, 2)}\n`, "utf8");
    return clean;
}
function getFtpForDate(date, settings = readSettings()) {
    const effectiveDate = localDateKey(date);
    return settings.ftpHistory.filter((entry)=>entry.date <= effectiveDate).at(-1)?.watts;
}
function getCurrentFtp(settings = readSettings()) {
    return getFtpForDate(new Date(), settings);
}
}),
"[project]/lib/training.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activityLoad",
    ()=>activityLoad,
    "buildLoadModel",
    ()=>buildLoadModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/settings.ts [app-rsc] (ecmascript)");
;
function dateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}
function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function activityLoad(activity, settings) {
    if (activity.trainingStress !== undefined && activity.trainingStress >= 0) {
        return {
            file: activity.file,
            date: activity.date,
            tss: activity.trainingStress,
            estimated: false,
            ftp: activity.thresholdPower,
            intensityFactor: activity.intensityFactor
        };
    }
    const ftp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFtpForDate"])(activity.date, settings) ?? activity.thresholdPower;
    const np = activity.normalizedPower;
    const activeSec = activity.timerSec !== undefined && activity.timerSec > 0 ? activity.timerSec : activity.movingSec;
    if (!ftp || !np || !activeSec) return {
        file: activity.file,
        date: activity.date,
        estimated: true,
        ftp
    };
    const intensityFactor = np / ftp;
    const tss = activeSec / 3600 * intensityFactor * intensityFactor * 100;
    return {
        file: activity.file,
        date: activity.date,
        tss,
        estimated: true,
        ftp,
        intensityFactor
    };
}
function buildLoadModel(activities, settings, days = 90) {
    const now = new Date();
    const today = startOfDay(now);
    const displayStart = new Date(today);
    displayStart.setDate(displayStart.getDate() - (Math.max(1, days) - 1));
    const loadByDay = new Map();
    const activityLoads = activities.map((activity)=>activityLoad(activity, settings));
    activityLoads.forEach((load)=>{
        if (load.tss === undefined) return;
        const key = dateKey(load.date);
        loadByDay.set(key, (loadByDay.get(key) ?? 0) + load.tss);
    });
    const earliestLoadDate = activityLoads.reduce((earliest, load)=>{
        if (load.tss === undefined || Number.isNaN(load.date.getTime())) return earliest;
        const day = startOfDay(load.date);
        return !earliest || day < earliest ? day : earliest;
    }, undefined);
    const modelStart = earliestLoadDate && earliestLoadDate < displayStart ? earliestLoadDate : displayStart;
    const result = [];
    let ctl = 0;
    let atl = 0;
    const ctlFactor = 1 - Math.exp(-1 / 42);
    const atlFactor = 1 - Math.exp(-1 / 7);
    for(const date = new Date(modelStart); date <= today; date.setDate(date.getDate() + 1)){
        const key = dateKey(date);
        const load = loadByDay.get(key) ?? 0;
        ctl += (load - ctl) * ctlFactor;
        atl += (load - atl) * atlFactor;
        if (date >= displayStart) {
            result.push({
                date: key,
                load,
                ctl,
                atl,
                form: ctl - atl
            });
        }
    }
    const latest = result.at(-1) ?? {
        date: dateKey(now),
        load: 0,
        ctl: 0,
        atl: 0,
        form: 0
    };
    const last7 = result.slice(-7).reduce((sum, day)=>sum + day.load, 0);
    const previous7 = result.slice(-14, -7).reduce((sum, day)=>sum + day.load, 0);
    const ramp = previous7 > 0 ? (last7 - previous7) / previous7 * 100 : last7 > 0 ? 100 : 0;
    return {
        days: result,
        latest,
        last7,
        previous7,
        ramp,
        activityLoads
    };
}
}),
]})(),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/app/coach/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/coach/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0wkv6ft7yq3bh._.js.map