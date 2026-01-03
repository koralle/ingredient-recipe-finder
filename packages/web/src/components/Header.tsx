import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChefHat, Menu, X, Home, Search } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="p-4 flex items-center bg-orange-500 text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-orange-600 rounded-lg transition-colors"
          aria-label="メニューを開く"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat size={28} />
            <span>レシピ検索</span>
          </Link>
        </h1>
      </header>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        aria-label="メインナビゲーション"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">メニュー</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="メニューを閉じる"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                "flex items-center gap-3 p-3 rounded-lg bg-orange-600 hover:bg-orange-700 transition-colors mb-2",
            }}
          >
            <Home size={20} />
            <span className="font-medium">ホーム</span>
          </Link>

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
          >
            <Search size={20} />
            <span className="font-medium">材料から検索</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          <p>アイリスオーヤマ電気圧力鍋レシピ</p>
        </div>
      </aside>
    </>
  );
}
