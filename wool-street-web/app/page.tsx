"use client";

import { ConnectButton, useCurrentAccount, useIotaClient, useSignAndExecuteTransaction } from "@iota/dapp-kit";
import { Transaction } from "@iota/iota-sdk/transactions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, DollarSign } from "lucide-react";

import { GameStage } from "@/components/GameStage";
import { GOAT_TYPE, ACCESSORY_TYPE, PACKAGE_ID, SHOP_ITEMS } from "@/utils/constants";

// -----------------------------
// Types
// -----------------------------
type InventoryItem = {
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
  equipped: InventoryItem[];
  isDemo: boolean;
};

// -----------------------------
// Constants & Utils
// -----------------------------
const DEMO_GOAT: Goat = {
  id: "virtual_goat",
  name: "Billy (Preview)",
  value: 0,
  visual_url: "",
  equipped: [],
  isDemo: true,
};

const formatIota = (amount: number) =>
  amount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

// -----------------------------
// Page
// -----------------------------
export default function Home() {
  const account = useCurrentAccount();
  const client = useIotaClient();
  const queryClient = useQueryClient();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  // -----------------------------
  // 1. Goat (NFT)
  // -----------------------------
  const { data: myGoat, isLoading: loadingGoat, refetch: refetchGoat } = useQuery<Goat | null>({
    queryKey: ["my-goat", account?.address],
    enabled: !!account,
    queryFn: async () => {
      if (!account) return null;

      const { data } = await client.getOwnedObjects({
        owner: account.address,
        filter: { StructType: GOAT_TYPE },
        options: { showContent: true, showDisplay: true },
      });

      if (!data.length) return null;

      const goatObj = data[0];
      const fields = goatObj.data?.content?.fields as any;

      // Equipped items (dynamic fields)
      let equipped: InventoryItem[] = [];
      try {
        const df = await client.getDynamicFields({ parentId: goatObj.data?.objectId! });
        if (df.data.length) {
          const ids = df.data.map((d) => d.objectId);
          const items = await client.multiGetObjects({
            ids,
            options: { showContent: true, showDisplay: true },
          });

          equipped = items.map((item: any) => {
            const f = item.data?.content?.fields as any;
            const name = f?.name || "Unknown";
            const shop = SHOP_ITEMS.find((i) => i.name === name);
            return {
              id: item.data?.objectId,
              name,
              image: f?.visual_url || "",
              price: shop?.price || 0,
              isEquipped: true,
            };
          });
        }
      } catch {
        // silent fail – UI tetap jalan
      }

      return {
        id: goatObj.data?.objectId,
        name: typeof fields?.name === "string" ? fields.name : "Billy",
        value: Number(fields?.total_value || 0),
        visual_url: fields?.visual_url || "",
        equipped,
        isDemo: false,
      } as Goat;
    },
  });

  // -----------------------------
  // 2. Wallet Inventory (Accessories)
  // -----------------------------
  const { data: walletItems, isLoading: loadingWallet, refetch: refetchWallet } = useQuery<InventoryItem[]>({
    queryKey: ["my-wallet-items", account?.address],
    enabled: !!account,
    queryFn: async () => {
      if (!account) return [];

      const { data } = await client.getOwnedObjects({
        owner: account.address,
        filter: { StructType: ACCESSORY_TYPE },
        options: { showContent: true, showDisplay: true },
      });

      return data.map((obj: any) => {
        const f = obj.data?.content?.fields as any;
        const name = f?.name || "Item";
        const shop = SHOP_ITEMS.find((i) => i.name === name);
        return {
          id: obj.data?.objectId,
          name,
          image: f?.visual_url || "",
          price: shop?.price || 0,
          isEquipped: false,
        };
      });
    },
  });

  // -----------------------------
  // 3. IOTA Balance (robust but clean)
  // -----------------------------
  const { data: iotaBalance = 0, isLoading: loadingBalance } = useQuery<number>({
    queryKey: ["iota-balance", account?.address],
    enabled: !!account,
    refetchInterval: 5000,
    retry: 2,
    queryFn: async () => {
      if (!account) return 0;

      // Preferred: getAllBalances
      try {
        const balances = await client.getAllBalances({ owner: account.address });
        const iota = balances.find((b: any) =>
          b.coinType === "0x2::iota::IOTA" || String(b.coinType).includes("::iota::IOTA")
        );
        if (iota) return Number(iota.totalBalance || 0);
      } catch {
        /* fallback below */
      }

      // Fallback: sum coins
      const { data } = await client.getCoins({ owner: account.address });
      return data.reduce((sum: number, c: any) => sum + Number(c.balance || c.amount || 0), 0);
    },
  });

  // -----------------------------
  // Derived state
  // -----------------------------
  const activeGoat: Goat = myGoat || DEMO_GOAT;
  const fullInventory: InventoryItem[] = [
    ...(myGoat?.equipped || []),
    ...(walletItems || []),
  ];

  const totalAssetValue = activeGoat.isDemo
    ? 0
    : fullInventory.reduce((t, i) => t + Number(i.price || 0), Number(activeGoat.value || 0));

  const refreshData = () => {
    refetchGoat();
    refetchWallet();
    queryClient.invalidateQueries({ queryKey: ["iota-balance"] });
  };

  // -----------------------------
  // Actions
  // -----------------------------
  const handleMint = () => {
    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::core::mint_goat`,
      arguments: [tx.pure.string("Billy")],
    });

    signAndExecuteTransaction(
      { transaction: tx },
      {
        onSuccess: () => {
          alert("Billy berhasil diaktifkan! 🎉");
          setTimeout(refreshData, 1500);
        },
        onError: (err) => alert(`Gagal aktivasi: ${err.message}`),
      }
    );
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-black to-black pointer-events-none" />

      {/* Header */}
      <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
        {account ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-gray-700 shadow-xl">
              <DollarSign size={16} className="text-green-400" />
              <span className="text-gray-300 text-sm font-medium">
                {loadingBalance ? "Loading..." : `${formatIota(iotaBalance)} IOTA`}
              </span>
            </div>
            <div className="font-black text-white tracking-widest text-xl italic hidden sm:block">
              WOOL STREET <span className="text-[10px] text-gray-400 not-italic font-normal">v1.0</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="font-black text-white tracking-widest text-xl italic">
              WOOL STREET <span className="text-[10px] text-gray-400 not-italic font-normal">v1.0</span>
            </div>
          </div>
        )}
        <ConnectButton />
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl z-10 flex flex-col justify-center items-center">
        {(loadingGoat || loadingWallet || loadingBalance) && account ? (
          <div className="flex flex-col items-center justify-center text-white gap-4">
            <Loader2 className="animate-spin text-indigo-500" size={64} />
            <p className="animate-pulse text-lg font-medium">Mempersiapkan kandang...</p>
          </div>
        ) : (
          <GameStage
            goat={activeGoat}
            inventory={fullInventory}
            onRefresh={refreshData}
            onMint={handleMint}
            totalAssetValue={totalAssetValue}
            currentBalance={iotaBalance}
          />
        )}
      </div>
    </main>
  );
}
