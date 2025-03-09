"use client";
import { useState } from "react";
import { Copy } from "lucide-react";

export default function EncryptionPage() {
    const [plainText, setPlainText] = useState("");
    const [encryptedText, setEncryptedText] = useState(""); 
    const [decryptedText, setDecryptedText] = useState(""); 
    const [cipherInput, setCipherInput] = useState(""); 
    const [copyMessage, setCopyMessage] = useState("");
    const key = 128; 

    const encrypt = (text) => {
        let encrypted = "";
        for (let i = 0; i < text.length; i++) {
            let xorChar = text.charCodeAt(i) ^ key;
            let caesarChar = xorChar + 3;
            encrypted += String.fromCharCode(caesarChar);
        }
        return btoa(encrypted);
    };

    const decrypt = (encryptedText) => {
        let decoded = atob(encryptedText);
        let decrypted = "";
        for (let i = 0; i < decoded.length; i++) {
            let caesarChar = decoded.charCodeAt(i) - 3;
            let xorChar = caesarChar ^ key;
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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopyMessage("Copied to clipboard!");
        setTimeout(() => setCopyMessage(""), 2000);
    };

    return (
        <div className="flex flex-col items-center mb-2 justify-center min-h-screen bg-transparent p-4 overflow-y-auto relative">
            <h1 className="sm:text-3xl text-xl font-bold mb-6">🔐 Shifrlash & Deshifrlash</h1>

            {copyMessage && (
                <div className="absolute bottom-4 bg-gray-900 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
                    {copyMessage}
                </div>
            )}

            <div className="mb-6">
                <h2 className="sm:text-xl text-sm font-semibold mb-2">📝 Oddiy matnni shifrlash</h2>
                <input
                    type="text"
                    placeholder="Matn kiriting"
                    value={plainText}
                    onChange={(e) => setPlainText(e.target.value)}
                    className="p-2 rounded bg-gray-800 border border-gray-600 text-white mb-2 w-80 text-center"
                />
                <button
                    onClick={handleEncrypt}
                    className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition"
                >
                    🔒 Shifrlash
                </button>
                {encryptedText && (
                    <div className="mt-2 flex items-center gap-2 text-green-400">
                        <p>Shifrlangan: {encryptedText}</p>
                        <button onClick={() => copyToClipboard(encryptedText)}>
                            <Copy className="w-5 h-5 cursor-pointer text-gray-400" />
                        </button>
                    </div>
                )}
            </div>

            <div>
                <h2 className="sm:text-xl text-sm font-semibold mb-2">🔓 Shifrlangan matnni oddiyga o‘girish</h2>
                <input
                    type="text"
                    placeholder="Shifrlangan matnni kiriting"
                    value={cipherInput}
                    onChange={(e) => setCipherInput(e.target.value)}
                    className="p-2 rounded bg-gray-800 border text-white border-gray-600 mb-2 w-80 text-center"
                />
                <button
                    onClick={handleDecrypt}
                    className="px-4 py-2 bg-green-500 rounded hover:bg-green-700 transition"
                >
                    🔓 Deshifrlash
                </button>
                {decryptedText && (
                    <div className="mt-2 flex items-center gap-2 text-yellow-400">
                        <p>Oddiy matn: {decryptedText}</p>
                        <button onClick={() => copyToClipboard(decryptedText)}>
                            <Copy className="w-5 h-5 cursor-pointer text-gray-400" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
