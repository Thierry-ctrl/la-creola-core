import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setBaseUrl } from "@workspace/api-client-react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "./components/layout";

import Home from "./pages/home";
import Menu from "./pages/menu";
import Events from "./pages/events";
import PrivateDining from "./pages/private-dining";
import About from "./pages/about";
import Reserve from "./pages/reserve";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

setBaseUrl(apiBaseUrl ? apiBaseUrl : null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/events" component={Events} />
        <Route path="/private-dining" component={PrivateDining} />
        <Route path="/about" component={About} />
        <Route path="/reserve" component={Reserve} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
