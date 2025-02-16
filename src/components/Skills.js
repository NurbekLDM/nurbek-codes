"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var react_lottie_1 = require("react-lottie");
var rectangles = [
    { id: 1, lottieUrl: "https://res.cloudinary.com/dl2adjye7/raw/upload/v1716532587/stack_zrrg4m.json", title: "Skill 1", description: "Description for skill 1" },
    { id: 2, lottieUrl: "https://res.cloudinary.com/dl2adjye7/raw/upload/v1716532587/stack_zrrg4m.json", title: "Skill 2", description: "Description for skill 2" },
    { id: 3, lottieUrl: "https://res.cloudinary.com/dl2adjye7/raw/upload/v1716532587/stack_zrrg4m.json", title: "Skill 3", description: "Description for skill 3" },
    { id: 4, lottieUrl: "https://res.cloudinary.com/dl2adjye7/raw/upload/v1716532587/stack_zrrg4m.json", title: "Skill 4", description: "Description for skill 4" },
    { id: 5, lottieUrl: "https://res.cloudinary.com/dl2adjye7/raw/upload/v1716532587/stack_zrrg4m.json", title: "Skill 5", description: "Description for skill 5" },
];
var NotifTemplate = function (_a) {
    var lottieUrl = _a.lottieUrl, title = _a.title, description = _a.description;
    var _b = (0, react_1.useState)(null), animationData = _b[0], setAnimationData = _b[1];
    var _c = (0, react_1.useState)(true), isStopped = _c[0], setIsStopped = _c[1];
    var _d = (0, react_1.useState)(true), isPaused = _d[0], setIsPaused = _d[1];
    (0, react_1.useEffect)(function () {
        var fetchAnimation = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(lottieUrl)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setAnimationData(data);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchAnimation();
    }, [lottieUrl]);
    var defaultOptions = {
        loop: true,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (<div className="flex items-center p-4 bg-white shadow-lg rounded-lg w-[300px] sm:w-[400px] h-[100px] border" onMouseEnter={function () {
            setIsStopped(false);
            setIsPaused(false);
        }} onMouseLeave={function () {
            setIsStopped(true);
            setIsPaused(true);
        }}>
      <div className="w-16 h-16 mr-4">
        <react_lottie_1.default options={defaultOptions} height={64} width={64} isStopped={isStopped} isPaused={isPaused}/>
      </div>
      <div className="flex flex-col justify-start">
        <h3 className="text-lg font-bold text-left">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>);
};
var CardPilling = function (_a) {
    var _b = _a.loop, loop = _b === void 0 ? true : _b;
    var _c = (0, react_1.useState)([]), visibleRectangles = _c[0], setVisibleRectangles = _c[1];
    var _d = (0, react_1.useState)(false), triggerExit = _d[0], setTriggerExit = _d[1];
    var _e = (0, react_1.useState)(0), loopCount = _e[0], setLoopCount = _e[1];
    var rectRef = (0, react_1.useRef)(null);
    var _f = (0, react_1.useState)(0), rectHeight = _f[0], setRectHeight = _f[1];
    var margin = 20;
    (0, react_1.useEffect)(function () {
        if (rectRef.current) {
            setRectHeight(rectRef.current.offsetHeight + margin);
        }
    }, [rectRef.current]);
    (0, react_1.useEffect)(function () {
        if (!triggerExit) {
            var interval_1 = setInterval(function () {
                setVisibleRectangles(function (prev) {
                    if (prev.length < rectangles.length) {
                        return __spreadArray([rectangles[prev.length]], prev, true);
                    }
                    else {
                        clearInterval(interval_1);
                        setTimeout(function () { return setTriggerExit(true); }, 1500);
                        return prev;
                    }
                });
            }, 1000);
            return function () { return clearInterval(interval_1); };
        }
        else if (loop) {
            setTimeout(function () {
                setTriggerExit(false);
                setVisibleRectangles([]);
                setLoopCount(loopCount + 1);
            }, 3000);
        }
    }, [triggerExit, loop, loopCount]);
    return (<div className="relative flex items-start justify-center pt-10 h-[700px]">
      <framer_motion_1.AnimatePresence>
        {!triggerExit &&
            visibleRectangles.map(function (rect, index) { return (<framer_motion_1.motion.div key={rect.id} ref={index === 0 ? rectRef : null} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: index * rectHeight }} exit={{ opacity: 0, y: 50 }} whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="absolute mb-5 w-[300px] sm:w-[400px] h-[100px]">
              <NotifTemplate {...rect}/>
            </framer_motion_1.motion.div>); })}
      </framer_motion_1.AnimatePresence>
    </div>);
};
var App = function () {
    return (<div className="h-screen mt-24 text-center">
      <CardPilling />
    </div>);
};
exports.default = App;
