module.exports = [
"[project]/components/RouteMap.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "badge": "RouteMap-module__EmR1Kq__badge",
  "empty": "RouteMap-module__EmR1Kq__empty",
  "map": "RouteMap-module__EmR1Kq__map",
  "wrap": "RouteMap-module__EmR1Kq__wrap",
});
}),
"[project]/components/RouteMap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RouteMap",
    ()=>RouteMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RouteMap$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/RouteMap.module.css [app-ssr] (css module)");
"use client";
;
;
;
function RouteMap({ points }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let disposed = false;
        async function mountMap() {
            if (!containerRef.current || points.length < 2 || mapRef.current) return;
            const L = await __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-ssr] (ecmascript, async loader)");
            if (disposed || !containerRef.current) return;
            const map = L.map(containerRef.current, {
                zoomControl: false,
                attributionControl: true,
                preferCanvas: true
            });
            mapRef.current = map;
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: "© OpenStreetMap contributors"
            }).addTo(map);
            L.control.zoom({
                position: "bottomright"
            }).addTo(map);
            const latLngs = points.map((point)=>L.latLng(point.lat, point.lon));
            const route = L.polyline(latLngs, {
                color: "#8b5cf6",
                weight: 5,
                opacity: 0.96,
                lineCap: "round",
                lineJoin: "round"
            }).addTo(map);
            L.circleMarker(latLngs[0], {
                radius: 7,
                color: "#ffffff",
                weight: 3,
                fillColor: "#22c55e",
                fillOpacity: 1
            }).bindTooltip("Partenza", {
                direction: "top",
                offset: [
                    0,
                    -6
                ]
            }).addTo(map);
            L.circleMarker(latLngs.at(-1), {
                radius: 7,
                color: "#ffffff",
                weight: 3,
                fillColor: "#f97316",
                fillOpacity: 1
            }).bindTooltip("Arrivo", {
                direction: "top",
                offset: [
                    0,
                    -6
                ]
            }).addTo(map);
            map.fitBounds(route.getBounds(), {
                padding: [
                    30,
                    30
                ],
                maxZoom: 15
            });
            requestAnimationFrame(()=>map.invalidateSize());
        }
        mountMap();
        return ()=>{
            disposed = true;
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, [
        points
    ]);
    if (points.length < 2) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RouteMap$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].map} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RouteMap$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].empty}`,
            children: "Traccia GPS non disponibile"
        }, void 0, false, {
            fileName: "[project]/components/RouteMap.tsx",
            lineNumber: 75,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RouteMap$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].wrap,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RouteMap$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].map
            }, void 0, false, {
                fileName: "[project]/components/RouteMap.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RouteMap$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].badge,
                children: "MAPPA · GPS FIT"
            }, void 0, false, {
                fileName: "[project]/components/RouteMap.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/RouteMap.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_092n609hezj5b._.js.map