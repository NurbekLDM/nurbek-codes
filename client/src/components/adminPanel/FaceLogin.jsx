import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function FaceLogin() {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const [faceMesh, setFaceMesh] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [referenceKeypoints, setReferenceKeypoints] = useState(null);
  const [isFaceLoaded, setIsFaceLoaded] = useState(false);

  const referenceImageURL = "/assets/reference-img.jpg";

  useEffect(() => {
    async function loadFaceMesh() {
      if (typeof window !== "undefined") {
        try {
          const ml5 = await import("ml5");
          console.log("ml5 loaded:", ml5);
          if (!ml5.default || !ml5.default.faceMesh) {
            console.error("❌ ml5.faceMesh is not available!");
            return;
          }

          const faceMeshInstance = ml5.default.faceMesh(
            { maxFaces: 1, refineLandmarks: true, minConfidence: 0.5 },
            () => {
              console.log("✅ FaceMesh initialized");
              setFaceMesh(faceMeshInstance);

              const img = new Image();
              img.crossOrigin = "Anonymous";
              img.src = referenceImageURL;
              img.onload = () => {
                console.log("Image loaded:", {
                  src: img.src,
                  width: img.width,
                  height: img.height,
                });
                faceMeshInstance.detect(img, (results) => {
                  console.log("Raw faceMesh.detect results:", results);
                  if (
                    results &&
                    results.length > 0 &&
                    Array.isArray(results[0].keypoints)
                  ) {
                    const normalizedKeypoints = results[0].keypoints.map(
                      (kp) => ({
                        x: kp.x / img.width,
                        y: kp.y / img.height,
                        z: kp.z / Math.max(img.width, img.height),
                      })
                    );
                    setReferenceKeypoints(normalizedKeypoints);
                    setIsFaceLoaded(true);
                    console.log(
                      "✅ Normalized reference keypoints:",
                      normalizedKeypoints
                    );
                  } else {
                    console.error(
                      "❌ No face detected or keypoints massiv emas in reference image!"
                    );
                  }
                });
              };
              img.onerror = () => {
                console.error(
                  "❌ Reference image failed to load:",
                  referenceImageURL
                );
              };
            }
          );
        } catch (error) {
          console.error("❌ Error loading ml5.js:", error);
        }
      }
    }

    loadFaceMesh();
  }, []);

  useEffect(() => {
    if (isCameraActive && faceMesh && video) {
      console.log("ℹ️ isCameraActive true bo‘ldi, detectFace chaqirilmoqda");
      detectFace(faceMesh, video);
    }
  }, [isCameraActive, faceMesh, video]);

  async function startFaceLogin() {
    if (!isFaceLoaded) {
      alert("❌ Oldindan berilgan yuz yuklanmadi! Iltimos, biroz kuting.");
      return;
    }
    if (!faceMesh) {
      alert("❌ FaceMesh hali tayyor emas!");
      console.log("❌ faceMesh mavjud emas:", faceMesh);
      return;
    }

    try {
      console.log("ℹ️ isCameraActive true ga o‘rnatilmoqda");
      setIsCameraActive(true);

      const videoElement = document.createElement("video");
      videoElement.width = 640;
      videoElement.height = 480;
      videoElement.autoplay = true;

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoElement.srcObject = stream;

      const container = document.getElementById("video-container");
      if (container) {
        container.innerHTML = "";
        container.appendChild(videoElement);
      }

      await new Promise((resolve) => {
        videoElement.onloadedmetadata = () => {
          console.log("✅ Video metadata yuklandi");
          resolve();
        };
      });

      setVideo(videoElement);
      console.log("✅ Camera started");
      console.log("ℹ️ faceMesh qiymati:", faceMesh);
    } catch (error) {
      console.error("❌ Error starting camera:", error);
      setIsCameraActive(false);
    }
  }

  async function detectFace(faceMeshInstance, videoElement) {
    console.log("ℹ️ detectFace chaqirildi");
    if (!faceMeshInstance) {
      console.log("❌ faceMeshInstance mavjud emas");
      return;
    }

    console.log("ℹ️ detectFace davom etmoqda");
    try {
      console.log("Video holati:", {
        width: videoElement.videoWidth,
        height: videoElement.videoHeight,
        playing:
          videoElement.currentTime > 0 &&
          !videoElement.paused &&
          !videoElement.ended,
      });

      if (!videoElement.videoWidth) {
        console.log("⏳ Video hali tayyor emas...");
        setTimeout(() => detectFace(faceMeshInstance, videoElement), 500);
        return;
      }

      console.log("ℹ️ faceMesh.detect chaqirilmoqda");
      faceMeshInstance.detect(videoElement, (results) => {
        console.log("Video detection results:", results);
        if (
          results &&
          results.length > 0 &&
          Array.isArray(results[0].keypoints)
        ) {
          const normalizedKeypoints = results[0].keypoints.map((kp) => ({
            x: kp.x / videoElement.videoWidth,
            y: kp.y / videoElement.videoHeight,
            z:
              kp.z /
              Math.max(videoElement.videoWidth, videoElement.videoHeight),
          }));
          console.log("✅ Normalized video keypoints:", normalizedKeypoints);
          const isMatch = compareFaces(normalizedKeypoints, referenceKeypoints);
          console.log("Yuz mosligi:", isMatch ? "✅ Ha" : "❌ Yo‘q");
          if (isMatch) {
            console.log("ℹ️ handleLogin chaqirilmoqda");
            handleLogin();
            return;
          }
        } else {
          console.log("❌ Videoda yuz aniqlanmadi yoki keypoints massiv emas");
        }
        setTimeout(() => detectFace(faceMeshInstance, videoElement), 500);
      });
    } catch (error) {
      console.error("❌ Yuz aniqlashda xato:", error);
      setTimeout(() => detectFace(faceMeshInstance, videoElement), 500);
    }
  }

  function compareFaces(keypoints1, keypoints2) {
    console.log("keypoints1:", keypoints1);
    console.log("keypoints2:", keypoints2);

    if (!Array.isArray(keypoints1) || !Array.isArray(keypoints2)) {
      console.error("❌ keypoints1 yoki keypoints2 massiv emas");
      return false;
    }

    let distance = 0;
    for (let i = 0; i < Math.min(keypoints1.length, keypoints2.length); i++) {
      const kp1 = keypoints1[i];
      const kp2 = keypoints2[i];

      if (!kp1 || !kp2 || typeof kp1 !== "object" || typeof kp2 !== "object") {
        console.error("❌ keypoints1[i] yoki keypoints2[i] obyekt emas", {
          i,
          kp1,
          kp2,
        });
        return false;
      }

      const x1 = kp1.x,
        y1 = kp1.y,
        z1 = kp1.z;
      const x2 = kp2.x,
        y2 = kp2.y,
        z2 = kp2.z;
      const pointDistance = Math.sqrt(
        (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2
      );

      distance += pointDistance;
    }
    distance /= keypoints1.length;
    console.log("Hisoblangan masofa (o‘rtacha):", distance);
    return distance < 0.3; // Normalizatsiyadan keyin kichikroq chegara
  }

  async function handleLogin() {
    try {
      const response = await fetch(
        "https://nurbek-codes-9olu.vercel.app/api/admin/face-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status === 204) {
        console.log("✅ Login muvaffaqiyatli, token kutilmaydi");
        setIsAuthenticated(true);
        router.push("/dashboard");
        return;
      }

      if (!response.ok) {
        console.error("❌ API xato:", response.status, await response.text());
        alert(`❌ Login xatosi: ${response.status}`);
        return;
      }

      if (response.ok) {
        setIsAuthenticated(true);
        router.push("/dashboard"); // Ensure router is used after successful fetch
      }
    } catch (error) {
      console.error("❌ Server bilan muammo:", error);
      alert("❌ Server bilan aloqa xatosi");
    }
  }

  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Or sign in using face recognition
      </p>

      {!isCameraActive ? (
        <button
          onClick={startFaceLogin}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Yuz orqali kirish
        </button>
      ) : (
        <div id="video-container" className="mt-4"></div>
      )}

      <p>
        {isAuthenticated
          ? "✅ Tizimga kirdingiz!"
          : isCameraActive
          ? "⏳ Kamera orqali yuzingizni tasdiqlang"
          : ""}
      </p>
    </div>
  );
}
