import SearchBar from "@/components/ui/search/SearchBar";

export default function Header() {
  return (
    <header className="w-full border-b p-2 text-text border-border">
      <div className="header-container container mx-auto flex justify-between items-center ">
        <h1 className="text-primary font-bold text-2xl">Tager</h1>
        <SearchBar />
      </div>
    </header>
  );
}
