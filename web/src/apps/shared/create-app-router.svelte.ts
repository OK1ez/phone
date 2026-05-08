import type { AppRouteDefinition, NavigationDirection } from "$apps/types";

type AppRouteMap = Record<string, AppRouteDefinition>;
type RouteId<TRoutes extends AppRouteMap> = Extract<keyof TRoutes, string>;

interface CreateAppRouterOptions<TRoutes extends AppRouteMap> {
  routes: TRoutes;
  initialRoute: RouteId<TRoutes>;
  onNavigate?: (routeId: RouteId<TRoutes>, direction: NavigationDirection) => void;
}

export interface AppRouter<TRoutes extends AppRouteMap> {
  readonly routes: TRoutes;
  currentRoute: RouteId<TRoutes>;
  direction: NavigationDirection;
  readonly currentComponent: TRoutes[RouteId<TRoutes>]["component"];
  navigate(routeId: RouteId<TRoutes>, back?: boolean): void;
  reset(): void;
}

export function createAppRouter<const TRoutes extends AppRouteMap>({
  routes,
  initialRoute,
  onNavigate,
}: CreateAppRouterOptions<TRoutes>): AppRouter<TRoutes> {
  let currentRoute = $state<RouteId<TRoutes>>(initialRoute);
  let direction = $state<NavigationDirection>("forward");
  let currentComponent = $derived(routes[currentRoute].component);

  return {
    routes,
    get currentRoute() {
      return currentRoute;
    },
    set currentRoute(routeId) {
      currentRoute = routeId;
    },
    get direction() {
      return direction;
    },
    set direction(nextDirection) {
      direction = nextDirection;
    },
    get currentComponent() {
      return currentComponent;
    },
    navigate(routeId, back = false) {
      direction = back ? "back" : "forward";
      currentRoute = routeId;
      onNavigate?.(routeId, direction);
    },
    reset() {
      direction = "forward";
      currentRoute = initialRoute;
    },
  };
}
