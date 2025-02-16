"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var TypingMachine = function (_a) {
    var text = _a.text, _b = _a.speed, speed = _b === void 0 ? 70 : _b, _c = _a.fontSize, fontSize = _c === void 0 ? 'text-2xl' : _c, _d = _a.color, color = _d === void 0 ? 'text-gray-800' : _d, _e = _a.fontStyle, fontStyle = _e === void 0 ? '' : _e;
    var _f = (0, react_1.useState)(''), displayedText = _f[0], setDisplayedText = _f[1];
    var _g = (0, react_1.useState)(0), currentIndex = _g[0], setCurrentIndex = _g[1];
    var _h = (0, react_1.useState)(false), isComplete = _h[0], setIsComplete = _h[1];
    (0, react_1.useEffect)(function () {
        if (currentIndex < text.length) {
            var timeoutId_1 = setTimeout(function () {
                setDisplayedText(function (prev) { return prev + text[currentIndex]; });
                setCurrentIndex(function (prev) { return prev + 1; });
            }, speed);
            return function () { return clearTimeout(timeoutId_1); };
        }
        else {
            setIsComplete(true);
        }
    }, [currentIndex, text, speed]);
    return (<div className="flex items-center  h-[fit-content]">
      <framer_motion_1.motion.div className={"font-mono ".concat(fontSize, " ").concat(color, " ").concat(fontStyle)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {displayedText.split('').map(function (char, index) { return (<framer_motion_1.motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
            {char}
          </framer_motion_1.motion.span>); })}
        {!isComplete && (<framer_motion_1.motion.span className="animate-blink" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1 }}>
            |
          </framer_motion_1.motion.span>)}
      </framer_motion_1.motion.div>
    </div>);
};
var ExampleUsageTypingMachine = function () {
    return (<div className=" flex flex-col items-center sm:w-full w-[300px] justify-center space-y-4 text-center">
        <TypingMachine text="Nurbek Aliqo'ziyev -  Full-stack Developer" speed={70} fontSize="text-sm sm:text-4xl" color="text-black" fontStyle=""/>
      </div>);
};
function App() {
    return (<div className="h-screen text-center py-20">
      <ExampleUsageTypingMachine />
    </div>);
}
exports.default = App;
