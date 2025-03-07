"use client";
import { useState } from "react";

export default function EncryptionPage() {
    const [plainText, setPlainText] = useState("");
    const [encryptedText, setEncryptedText] = useState(""); 
    const [decryptedText, setDecryptedText] = useState(""); 
    const [cipherInput, setCipherInput] = useState(""); // 
    const key = 128; 

    // SHIFRLASH FUNKSIYASI (Oddiy matn → Shifrlangan)
    const encrypt = (text) => {
        let encrypted = "";
        for (let i = 0; i < text.length; i++) {
            let xorChar = text.charCodeAt(i) ^ key; // XOR shifrlash
            let caesarChar = xorChar + 3; // Caesar shifrlash
            encrypted += String.fromCharCode(caesarChar);
        }
        return btoa(encrypted); // Base64'ga o‘girish
    };

    //  DESHIFRLASH FUNKSIYASI (Shifrlangan matn → Oddiy matn)
    const decrypt = (encryptedText) => {
        let decoded = atob(encryptedText); // Base64'dan ochish
        let decrypted = "";
        for (let i = 0; i < decoded.length; i++) {
            let caesarChar = decoded.charCodeAt(i) - 3; // Caesar teskari surish
            let xorChar = caesarChar ^ key; // XOR qaytarish
            decrypted += String.fromCharCode(xorChar);
        }
        return decrypted;
    };


    const handleEncrypt = () => {
        setEncryptedText(encrypt(plainText));
    };


    const handleDecrypt = () => {
        setDecryptedText(decrypt(cipherInput));
    };

    return (
        <div className="flex flex-col items-center mb-2 justify-center min-h-screen bg-transparent p-4 overflow-y-auto">
            <h1 className="sm:text-3xl text-xl font-bold mb-6">🔐 Shifrlash & Deshifrlash</h1>

            {/*  SHIFRLASH BLOKI */}
            <div className="mb-6">
                <h2 className="sm:text-xl text-sm font-semibold mb-2">📝 Oddiy matnni shifrlash</h2>
                <input
                    type="text"
                    placeholder="Matn kiriting"
                    value={plainText}
                    onChange={(e) => setPlainText(e.target.value)}
                    className="p-2 rounded bg-gray-800 border border-gray-600 mb-2 w-80 text-center"
                />
                <button
                    onClick={handleEncrypt}
                    className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition"
                >
                    🔒 Shifrlash
                </button>
                {encryptedText && (
                    <p className="mt-2 text-green-400">Shifrlangan: {encryptedText}</p>
                )}
            </div>

            {/*  DESHIFRLASH BLOKI */}
            <div>
                <h2 className="sm:text-xl text-sm font-semibold mb-2">🔓 Shifrlangan matnni oddiyga o‘girish</h2>
                <input
                    type="text"
                    placeholder="Shifrlangan matnni kiriting"
                    value={cipherInput}
                    onChange={(e) => setCipherInput(e.target.value)}
                    className="p-2 rounded bg-gray-800 border border-gray-600 mb-2 w-80 text-center"
                />
                <button
                    onClick={handleDecrypt}
                    className="px-4 py-2  bg-green-500 rounded hover:bg-green-700 transition"
                >
                    🔓 Deshifrlash
                </button>
                {decryptedText && (
                    <p className="mt-2 text-yellow-400">Oddiy matn: {decryptedText}</p>
                )}
            </div>
        </div>
    );
}