import "./App.css";

import { InfinitePeople } from "./people/InfinitePeople";
import { InfiniteSpecies } from "./species/InfiniteSpecies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <h1>Infinite SWAPI</h1>
      <QueryClientProvider client={queryClient}>
        <InfinitePeople />
        <ReactQueryDevtools />
      </QueryClientProvider>
      {/* <InfiniteSpecies /> */}
    </div>
  );
}

export default App;
