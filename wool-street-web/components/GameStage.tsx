"use client";

import Image from "next/image";
import { DollarSign, RefreshCw, PlusCircle } from "lucide-react";

/* ================= TYPES ================= */

type Item = {
  id: string;
  name: string;
  image: string;
  price: number;
  isEquipped: boolean;
};

type Goat = {
  id: string;
  name: string;
  value: number;
  visual_url: string;
  equipped: Item[];
  isDemo: boolean;
};

type GameStageProps = {
  goat: Goat;
  inventory: Item[];
  totalAssetValue: number;
  currentBalance: number;
  onMint: () => void;
  onRefresh: () => void;
};

/* ================= COMPONENT ================= */

export default function GameStage({
  goat,
  inventory,
  totalAssetValue,
  currentBalance,
  onMint,
  onRefresh,
}: GameStageProps) {
  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700 shadow-2xl p-6 text-white space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-black tracking-wide">
          🐐 {goat.name}
        </h1>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-600 text-sm hover:bg-gray-800 transition"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* GOAT VISUAL */}
      <div className="flex flex-col items-center gap-4">
        {goat.visual_url ? (
          <Image
            src={goat.visual_url}
            alt={goat.name}
            width={220}
            height={220}
            className="rounded-xl border border-gray-700"
          />
        ) : (
          <div className="w-[220px] h-[220px] rounded-xl bg-gray-800 flex items-center justify-center text-gray-500">
            No Visual
          </div>
        )}

        {goat.isDemo && (
          <button
            onClick={onMint}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold flex items-center gap-2 transition"
          >
            <PlusCircle size={16} />
            Aktifkan Billy
          </button>
        )}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4">
        <StatBox
          label="Total Asset Value"
          value={totalAssetValue.toLocaleString()}
        />
        <StatBox
          label="Wallet Balance"
          value={currentBalance.toLocaleString()}
          icon={<DollarSign size={14} />}
        />
      </div>

      {/* INVENTORY */}
      <div>
        <h2 className="font-bold mb-3">🎒 Inventory</h2>

        {inventory.length === 0 ? (
          <p className="text-gray-400 text-sm">
            Belum ada item.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {inventory.map((item) => (
              <div
                key={item.id}
                className={`rounded-xl border p-3 flex flex-col items-center gap-2
                ${
                  item.isEquipped
                    ? "border-green-500 bg-green-500/10"
                    : "border-gray-700 bg-gray-800"
                }`}
              >
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-xs overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                    />
                  ) : (
                    "Item"
                  )}
                </div>

                <div className="text-sm font-medium text-center">
                  {item.name}
                </div>

                <div className="text-xs text-gray-400">
                  Value: {item.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */

function StatBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="flex items-center gap-2 font-bold text-lg">
        {icon}
        {value}
      </div>
    </div>
  );
}
