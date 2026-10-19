module.exports = [
(()=>{"use strict";return[
"[project]/app/compare/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComparePage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left-right.js [app-rsc] (ecmascript) <export default as ArrowLeftRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bike$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bike.js [app-rsc] (ecmascript) <export default as Bike>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gauge.js [app-rsc] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart-pulse.js [app-rsc] (ecmascript) <export default as HeartPulse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mountain$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Mountain$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mountain.js [app-rsc] (ecmascript) <export default as Mountain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/timer.js [app-rsc] (ecmascript) <export default as Timer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-rsc] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/fit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/format.ts [app-rsc] (ecmascript)");
;
;
;
;
const dynamic = "force-dynamic";
function delta(a, b, digits = 0, suffix = "") {
    if (a === undefined || b === undefined) return "—";
    const value = a - b;
    return `${value > 0 ? "+" : ""}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(value, digits)}${suffix}`;
}
async function ComparePage({ searchParams }) {
    const params = await searchParams;
    const activities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivities"])(120);
    const fileA = params.a && activities.some((activity)=>activity.file === params.a) ? params.a : activities[0]?.file;
    const fileB = params.b && activities.some((activity)=>activity.file === params.b) ? params.b : activities[1]?.file;
    const a = fileA ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivity"])(fileA) : undefined;
    const b = fileB ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivity"])(fileB) : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pageWrap comparePage",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "topbar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "eyebrow",
                            children: "COMPARE LAB"
                        }, void 0, false, {
                            fileName: "[project]/app/compare/page.tsx",
                            lineNumber: 24,
                            columnNumber: 37
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            children: [
                                "Due uscite, ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "stesso metro."
                                }, void 0, false, {
                                    fileName: "[project]/app/compare/page.tsx",
                                    lineNumber: 24,
                                    columnNumber: 95
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/compare/page.tsx",
                            lineNumber: 24,
                            columnNumber: 79
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Confronta volume, potenza, cardio e power-duration senza perdere il contesto delle singole attività."
                        }, void 0, false, {
                            fileName: "[project]/app/compare/page.tsx",
                            lineNumber: 24,
                            columnNumber: 126
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/compare/page.tsx",
                    lineNumber: 24,
                    columnNumber: 32
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/compare/page.tsx",
                lineNumber: 24,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "panel comparePicker",
                method: "get",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Uscita A"
                            }, void 0, false, {
                                fileName: "[project]/app/compare/page.tsx",
                                lineNumber: 27,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                name: "a",
                                defaultValue: fileA,
                                children: activities.map((activity)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: activity.file,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatDate"])(activity.date, true),
                                            " · ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(activity.distanceKm, 1),
                                            " km"
                                        ]
                                    }, activity.file, true, {
                                        fileName: "[project]/app/compare/page.tsx",
                                        lineNumber: 27,
                                        columnNumber: 103
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/compare/page.tsx",
                                lineNumber: 27,
                                columnNumber: 35
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/compare/page.tsx",
                        lineNumber: 27,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__["ArrowLeftRight"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/app/compare/page.tsx",
                        lineNumber: 28,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Uscita B"
                            }, void 0, false, {
                                fileName: "[project]/app/compare/page.tsx",
                                lineNumber: 29,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                name: "b",
                                defaultValue: fileB,
                                children: activities.map((activity)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: activity.file,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatDate"])(activity.date, true),
                                            " · ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(activity.distanceKm, 1),
                                            " km"
                                        ]
                                    }, activity.file, true, {
                                        fileName: "[project]/app/compare/page.tsx",
                                        lineNumber: 29,
                                        columnNumber: 103
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/compare/page.tsx",
                                lineNumber: 29,
                                columnNumber: 35
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/compare/page.tsx",
                        lineNumber: 29,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "primaryButton",
                        type: "submit",
                        children: "Confronta"
                    }, void 0, false, {
                        fileName: "[project]/app/compare/page.tsx",
                        lineNumber: 30,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/compare/page.tsx",
                lineNumber: 26,
                columnNumber: 5
            }, this),
            a && b ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "compareHeroGrid",
                        children: [
                            a,
                            b
                        ].map((activity, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `panel compareHero compare-${index === 0 ? "a" : "b"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "compareLetter",
                                        children: index === 0 ? "A" : "B"
                                    }, void 0, false, {
                                        fileName: "[project]/app/compare/page.tsx",
                                        lineNumber: 35,
                                        columnNumber: 132
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sectionLabel",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatDate"])(activity.date, true)
                                            }, void 0, false, {
                                                fileName: "[project]/app/compare/page.tsx",
                                                lineNumber: 35,
                                                columnNumber: 199
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Uscita in bici"
                                            }, void 0, false, {
                                                fileName: "[project]/app/compare/page.tsx",
                                                lineNumber: 35,
                                                columnNumber: 269
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: activity.device ?? "Garmin"
                                            }, void 0, false, {
                                                fileName: "[project]/app/compare/page.tsx",
                                                lineNumber: 35,
                                                columnNumber: 292
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/compare/page.tsx",
                                        lineNumber: 35,
                                        columnNumber: 194
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(activity.distanceKm, 1),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: " km"
                                            }, void 0, false, {
                                                fileName: "[project]/app/compare/page.tsx",
                                                lineNumber: 35,
                                                columnNumber: 379
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/compare/page.tsx",
                                        lineNumber: 35,
                                        columnNumber: 334
                                    }, this)
                                ]
                            }, activity.file, true, {
                                fileName: "[project]/app/compare/page.tsx",
                                lineNumber: 35,
                                columnNumber: 40
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/compare/page.tsx",
                        lineNumber: 34,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel compareMetrics",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "compareMetricHeader",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Metrica"
                                    }, void 0, false, {
                                        fileName: "[project]/app/compare/page.tsx",
                                        lineNumber: 39,
                                        columnNumber: 46
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "A"
                                    }, void 0, false, {
                                        fileName: "[project]/app/compare/page.tsx",
                                        lineNumber: 39,
                                        columnNumber: 66
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "B"
                                    }, void 0, false, {
                                        fileName: "[project]/app/compare/page.tsx",
                                        lineNumber: 39,
                                        columnNumber: 80
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Δ A−B"
                                    }, void 0, false, {
                                        fileName: "[project]/app/compare/page.tsx",
                                        lineNumber: 39,
                                        columnNumber: 94
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/compare/page.tsx",
                                lineNumber: 39,
                                columnNumber: 9
                            }, this),
                            [
                                {
                                    label: "Tempo",
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__["Timer"],
                                    a: a.movingSec,
                                    b: b.movingSec,
                                    render: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatDuration"])(v),
                                    diff: ()=>delta(a.movingSec, b.movingSec, 0, " s")
                                },
                                {
                                    label: "Dislivello",
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mountain$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Mountain$3e$__["Mountain"],
                                    a: a.ascentM,
                                    b: b.ascentM,
                                    render: (v)=>`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(v)} m`,
                                    diff: ()=>delta(a.ascentM, b.ascentM, 0, " m")
                                },
                                {
                                    label: "Potenza media",
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
                                    a: a.avgPower,
                                    b: b.avgPower,
                                    render: (v)=>`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(v)} W`,
                                    diff: ()=>delta(a.avgPower, b.avgPower, 0, " W")
                                },
                                {
                                    label: "Normalized Power",
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"],
                                    a: a.normalizedPower,
                                    b: b.normalizedPower,
                                    render: (v)=>`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(v)} W`,
                                    diff: ()=>delta(a.normalizedPower, b.normalizedPower, 0, " W")
                                },
                                {
                                    label: "FC media",
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"],
                                    a: a.avgHr,
                                    b: b.avgHr,
                                    render: (v)=>`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(v)} bpm`,
                                    diff: ()=>delta(a.avgHr, b.avgHr, 0, " bpm")
                                },
                                {
                                    label: "Cadenza pedalando",
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bike$3e$__["Bike"],
                                    a: a.avgCadence,
                                    b: b.avgCadence,
                                    render: (v)=>`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatNumber"])(v)} rpm`,
                                    diff: ()=>delta(a.avgCadence, b.avgCadence, 0, " rpm")
                                }
                            ].map(({ label, icon: Icon, a: av, b: bv, render, diff })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "compareMetricRow",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 15
                                                }, void 0, false, {
                                                    fileName: "[project]/app/compare/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 112
                                                }, this),
                                                label
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/compare/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 106
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: av !== undefined ? render(av) : "—"
                                        }, void 0, false, {
                                            fileName: "[project]/app/compare/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 143
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: bv !== undefined ? render(bv) : "—"
                                        }, void 0, false, {
                                            fileName: "[project]/app/compare/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 187
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: diff()
                                        }, void 0, false, {
                                            fileName: "[project]/app/compare/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 231
                                        }, this)
                                    ]
                                }, label, true, {
                                    fileName: "[project]/app/compare/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 60
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/compare/page.tsx",
                        lineNumber: 38,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel compareCurve",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panelHeader",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "sectionLabel",
                                            children: "POWER DURATION"
                                        }, void 0, false, {
                                            fileName: "[project]/app/compare/page.tsx",
                                            lineNumber: 50,
                                            columnNumber: 81
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Curva di potenza testa a testa"
                                        }, void 0, false, {
                                            fileName: "[project]/app/compare/page.tsx",
                                            lineNumber: 50,
                                            columnNumber: 133
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/compare/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 76
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/compare/page.tsx",
                                lineNumber: 50,
                                columnNumber: 47
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "compareCurveGrid",
                                children: a.powerCurve.map((point, index)=>{
                                    const other = b.powerCurve[index];
                                    const d = point.watts !== null && other?.watts !== null ? point.watts - other.watts : null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: point.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/compare/page.tsx",
                                                lineNumber: 51,
                                                columnNumber: 199
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        className: "valueA",
                                                        children: [
                                                            point.watts ?? "—",
                                                            " W"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/compare/page.tsx",
                                                        lineNumber: 51,
                                                        columnNumber: 230
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        className: "valueB",
                                                        children: [
                                                            other?.watts ?? "—",
                                                            " W"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/compare/page.tsx",
                                                        lineNumber: 51,
                                                        columnNumber: 278
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/compare/page.tsx",
                                                lineNumber: 51,
                                                columnNumber: 225
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: d !== null ? `${d > 0 ? "+" : ""}${d} W` : "—"
                                            }, void 0, false, {
                                                fileName: "[project]/app/compare/page.tsx",
                                                lineNumber: 51,
                                                columnNumber: 333
                                            }, this)
                                        ]
                                    }, point.label, true, {
                                        fileName: "[project]/app/compare/page.tsx",
                                        lineNumber: 51,
                                        columnNumber: 176
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/compare/page.tsx",
                                lineNumber: 50,
                                columnNumber: 184
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/compare/page.tsx",
                        lineNumber: 50,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/compare/page.tsx",
                lineNumber: 33,
                columnNumber: 15
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "emptyState",
                children: "Servono almeno due attività FIT."
            }, void 0, false, {
                fileName: "[project]/app/compare/page.tsx",
                lineNumber: 53,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/compare/page.tsx",
        lineNumber: 23,
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
"[project]/app/compare/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/compare/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0q7p395xxpye0._.js.map